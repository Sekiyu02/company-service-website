'use client'

import { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    position: '',
    phone: '',
    email: '',
    inquiry: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        alert('お問い合わせを送信しました。ありがとうございます。\n担当者より2営業日以内にご連絡いたします。')
        setFormData({
          name: '',
          company: '',
          position: '',
          phone: '',
          email: '',
          inquiry: '',
          message: ''
        })
      } else {
        console.error('API Error:', result)
        alert(`送信に失敗しました: ${result.error || result.details || '不明なエラー'}`)
      }
    } catch (error) {
      console.error('送信エラー:', error)
      alert('送信中にエラーが発生しました。もう一度お試しください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* お名前 */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              お名前 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
              placeholder="山田 太郎"
            />
          </div>

          {/* 会社名 */}
          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
              会社名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="company"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
              placeholder="株式会社〇〇"
            />
          </div>

          {/* 役職 */}
          <div>
            <label htmlFor="position" className="block text-sm font-semibold text-gray-700 mb-2">
              役職
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
              placeholder="代表取締役"
            />
          </div>

          {/* 電話番号 */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
              電話番号 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
              placeholder="090-1234-5678"
            />
          </div>
        </div>

        {/* メールアドレス */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
            placeholder="example@company.com"
          />
        </div>

        {/* お問い合わせ内容 */}
        <div>
          <label htmlFor="inquiry" className="block text-sm font-semibold text-gray-700 mb-2">
            お問い合わせ内容
          </label>
          <select
            id="inquiry"
            name="inquiry"
            value={formData.inquiry}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
          >
            <option value="">選択してください</option>
            <option value="採用ブランディング映像について">採用ブランディング映像について</option>
            <option value="集客・PR映像について">集客・PR映像について</option>
            <option value="イベントプロモーション動画について">イベントプロモーション動画について</option>
            <option value="SNS運用代行について">SNS運用代行について</option>
            <option value="撮影・編集のみの依頼について">撮影・編集のみの依頼について</option>
            <option value="その他">その他</option>
          </select>
        </div>

        {/* 備考 */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
            備考・詳細内容
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-vertical"
            placeholder="ご相談内容やご要望などございましたら、こちらにご記入ください。"
          />
        </div>

        {/* 送信ボタン */}
        <div className="text-center pt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full md:w-auto px-12 py-4 text-white font-bold rounded-full transition-all duration-200 transform ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
          >
            {isSubmitting ? '送信中...' : 'お問い合わせを送信する'}
          </button>
        </div>
      </form>

      {/* 注意事項 */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          ※ いただいたお問い合わせには、営業時間内（平日9:00-18:00）に担当者よりご連絡いたします。<br />
          ※ お急ぎの場合は、お電話（080-6547-1033(代表)）でも承っております。
        </p>
      </div>
    </div>
  )
}

export default ContactForm