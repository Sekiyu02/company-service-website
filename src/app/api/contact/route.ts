import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { recordContactSubmission } from '@/lib/db'

export async function POST(request: NextRequest) {
  console.log('=== Contact API Called ===')
  try {
    const body = await request.json()
    console.log('Request body received:', body)
    const { name, company, position, phone, email, inquiry, message } = body

    // 必須フィールドの検証
    if (!name || !company || !phone || !email) {
      return NextResponse.json(
        { error: '必須フィールドが入力されていません' },
        { status: 400 }
      )
    }

    // メール設定（環境変数を使用）
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // メール内容
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: 'info@furakufine.com',
      subject: `【お問い合わせ】${company}様より - ${name}様`,
      html: `
        <h2>新しいお問い合わせが届きました</h2>
        
        <h3>お客様情報</h3>
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
          <tr>
            <td><strong>お名前</strong></td>
            <td>${name}</td>
          </tr>
          <tr>
            <td><strong>会社名</strong></td>
            <td>${company}</td>
          </tr>
          <tr>
            <td><strong>役職</strong></td>
            <td>${position || '未記入'}</td>
          </tr>
          <tr>
            <td><strong>電話番号</strong></td>
            <td>${phone}</td>
          </tr>
          <tr>
            <td><strong>メールアドレス</strong></td>
            <td>${email}</td>
          </tr>
          <tr>
            <td><strong>お問い合わせ内容</strong></td>
            <td>${inquiry || '未選択'}</td>
          </tr>
        </table>
        
        <h3>詳細内容・ご要望</h3>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${message ? message.replace(/\n/g, '<br>') : '未記入'}
        </div>
        
        <hr style="margin: 20px 0;">
        <p style="font-size: 12px; color: #666;">
          このメールは株式会社富楽ファインのWebサイトのお問い合わせフォームから送信されました。
        </p>
      `,
    }

    // 自動返信メール
    const autoReplyOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject: 'お問い合わせありがとうございます - 株式会社富楽ファイン',
      html: `
        <h2>${name}様</h2>
        
        <p>この度は、株式会社富楽ファインにお問い合わせいただき、誠にありがとうございます。</p>
        
        <p>以下の内容でお問い合わせを承りました。</p>
        
        <h3>お問い合わせ内容</h3>
        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse;">
          <tr>
            <td><strong>お名前</strong></td>
            <td>${name}</td>
          </tr>
          <tr>
            <td><strong>会社名</strong></td>
            <td>${company}</td>
          </tr>
          <tr>
            <td><strong>役職</strong></td>
            <td>${position || '未記入'}</td>
          </tr>
          <tr>
            <td><strong>電話番号</strong></td>
            <td>${phone}</td>
          </tr>
          <tr>
            <td><strong>お問い合わせ内容</strong></td>
            <td>${inquiry || '未選択'}</td>
          </tr>
        </table>
        
        <p>担当者より2営業日以内にご連絡いたします。お急ぎの場合は、お電話（080-6547-1033）でも承っております。</p>
        
        <hr style="margin: 20px 0;">
        <p>
          <strong>株式会社富楽ファイン</strong><br>
          〒283-0006 千葉県東金市東新宿12-5 富楽ビル301<br>
          TEL: 080-6547-1033(代表)<br>
          Email: info@furakufine.com
        </p>
      `,
    }

    // メール送信
    await transporter.sendMail(mailOptions)
    await transporter.sendMail(autoReplyOptions)

    // お問い合わせ統計に記録
    const forwarded = request.headers.get('x-forwarded-for')
    const ipAddress = forwarded ? forwarded.split(', ')[0] : request.headers.get('x-real-ip') || 'unknown'

    await recordContactSubmission({
      name,
      company,
      email,
      inquiryType: inquiry,
      ipAddress
    })

    return NextResponse.json(
      { message: 'お問い合わせを送信しました' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Email error:', error)
    console.error('SMTP settings:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER ? 'SET' : 'NOT_SET',
      pass: process.env.SMTP_PASS ? 'SET' : 'NOT_SET'
    })
    
    return NextResponse.json(
      { 
        error: 'メール送信に失敗しました',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}