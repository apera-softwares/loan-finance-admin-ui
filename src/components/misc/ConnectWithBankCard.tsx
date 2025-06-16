'use client'
import { BACKEND_API } from '@/api'
import { useEffect, useState } from 'react'
import { usePlaidLink } from 'react-plaid-link';

export default function ConnectWithBankCard() {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();
  const [account, setAccount] = useState();

  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch(`${BACKEND_API}api/create_link_token`, {
          method: 'POST',
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()
        console.log(data, 'fetch link token data')
        setLinkToken(data.link_token)
      } catch (error) {
        console.error('Error fetching link token:', error)
      }
    }

    fetchToken()
  }, [])

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      setPublicToken(public_token)
      console.log('success', public_token, metadata)
      // send public_token to server
    },
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const exchangeRes = await fetch(
          `${BACKEND_API}api/exchange_public_token
`,
          {
            method: 'POST',
            headers: {
              'ngrok-skip-browser-warning': 'true',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ public_token: publicToken }),
          },
        )

        const exchangeData = await exchangeRes.json()
        console.log('accessToken', exchangeData)

        const InfoRes = await fetch(`${BACKEND_API}api/info`, {
          method: 'POST',
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Content-Type': 'application/json',
          },
        })

        if (!InfoRes.ok) {
          throw new Error(`HTTP error! status: ${InfoRes.status}`)
        }

        const infoData = await InfoRes.json()
        console.log('Info data', infoData)

        const authRes = await fetch(
          `${BACKEND_API}api/auth?access_token=${encodeURIComponent(exchangeData.accessToken)}`,
          {
            method: 'GET',
            headers: {
              'ngrok-skip-browser-warning': 'true',
              'Content-Type': 'application/json',
            },
          },
        )

        if (!authRes.ok) {
          throw new Error(`HTTP error! status: ${authRes.status}`)
        }

        const authData = await authRes.json()
        console.log('auth data', authData)

        // transitions data api

        const transitionRes = await fetch(
          `${BACKEND_API}api/transactions?access_token=${encodeURIComponent(exchangeData.accessToken)}`,
          {
            method: 'GET',
            headers: {
              'ngrok-skip-browser-warning': 'true',
              'Content-Type': 'application/json',
            },
          },
        )

        if (!transitionRes.ok) {
          throw new Error(`HTTP error! status: ${transitionRes.status}`)
        }

        const transitionData = await transitionRes.json()
        console.log('Transion data', transitionData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [publicToken])

  return (

        <div className="w-full bg-white md:max-w-xl rounded-lg border border-green-500 p-6 text-center shadow-md ">
          <h2 className="mb-2 text-2xl font-semibold text-green-600">Business Bank Statements</h2>

          <p className="mb-6 text-gray-700">
            We partner with <strong>PLAID</strong> to verify your business activity and assess your eligibility for
            financing. When connecting your account, you maintain control at all times.
          </p>

          <button
            className="rounded-full bg-[#4c4cd6] px-6 py-2 font-semibold text-white transition hover:bg-[#3b3bb5]"
            onClick={() => open()}
            disabled={!ready}>
            Connect Now
          </button>

          <div className="mt-10 grid grid-cols-1 gap-4 border-t pt-6 text-left text-sm md:grid-cols-3">
            <div className="flex items-start gap-2">
              <span className="text-xl text-green-500">🛡️</span>
              <div>
                <p className="font-bold text-[#213468]">SAFE & SECURE</p>
                <p className="text-gray-600">Your information is secured with our 128-bit encryption across systems</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-xl text-green-500">🔒</span>
              <div>
                <p className="font-bold text-[#213468]">PRIVATE</p>
                <p className="text-gray-600">Your account login credentials are never shared with Lending Sqaure</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-xl text-green-500">✅</span>
              <div>
                <p className="font-bold text-[#213468]">TRUSTED</p>
                <p className="text-gray-600">+250,000 businesses across America choose Lending Sqaure for financing</p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-sm text-gray-600">
            Connecting your bank online is the fastest way to verify your business activity and get funding. If you’re
            facing a problem,{' '}
            <a href="#" className="font-medium text-green-600 underline">
              Upload PDF Bank Statements
            </a>
            .
          </p>
        </div>
  )
}