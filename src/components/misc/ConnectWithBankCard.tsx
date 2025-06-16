'use client'
import { BACKEND_API } from '@/api';
import { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import { useAppSelector } from '@/lib/redux/hooks';

export default function SuccessPage() {
  const [linkToken, setLinkToken] = useState<string>("")
  const [publicToken, setPublicToken] = useState<string>("")
  //const [account, setAccount] = useState();
  const {user:loggedInUser} = useAppSelector((state)=>state.user);

  useEffect(() => {
    getInfo();
    createAndFetchLinkToken()
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
  if (!publicToken) return;
  fetchData();
}, [publicToken]);

   async function fetchData(){
    try {
      const exchangeData = await exchangePublicToken();
      const transactionData = await fetchTransactions(exchangeData.accessToken);
      console.log("transation data",transactionData);
      
    } catch (err) {
      console.error('Failed to fetch transactions', err);
    }
  };

async function fetchTransactions(accessToken: string) {
  try {
    const response = await axios.get(
      `${BACKEND_API}api/transactions?access_token=${encodeURIComponent(accessToken)}`,
      {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${loggedInUser?.token}`,
        },
      }
    );

    const transactionData = response.data;
    console.log('Transaction data', transactionData);
    return transactionData;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}

async function exchangePublicToken() {
  try {
    const payload = { public_token: publicToken };
    const response = await axios.post(
      `${BACKEND_API}api/exchange_public_token`,
      payload,
      {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${loggedInUser?.token}`,
        },
      }
    );

    const exchangeData = response.data;
    console.log('accessToken', exchangeData);
    return exchangeData;
  } catch (error) {
    console.error('Error exchanging public token:', error);
    throw error;
  }
}

async function createAndFetchLinkToken() {
  try {
    const payload = {};
    const response = await axios.post(
      `${BACKEND_API}api/create_link_token`,
      payload,
      {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${loggedInUser?.token}`,
        },
      }
    );

    const data = response.data;
    console.log(data, 'fetch link token data');
    setLinkToken(data.link_token);
  } catch (error) {
    console.error('Error fetching link token:', error);
  }
}

  async function getInfo() {
  try {
    const payload = {};
    const response = await axios.post(
      `${BACKEND_API}api/info`,
      payload, 
      {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${loggedInUser?.token}`,          
        },
      }
    );

    const data = response.data;
    console.log(data, '/api/info');
  } catch (error) {
    console.error('Error fetching link token:', error);
  }
}
  return (
        <div className="w-full max-w-xl bg-white rounded-xl border border-gray-200 p-6 text-center shadow-md ">
          <h2 className="mb-4 text-xl font-semibold text-green-600">Business Bank Statements</h2>

          <p className="mb-6 text-gray-700">
            We partner with <strong>PLAID</strong> to verify your business activity and assess your eligibility for
            financing. When connecting your account, you maintain control at all times.
          </p>

          <button
            className="rounded-full bg-primary px-6 py-2 font-medium text-white  hover:bg-primary-hover transition-all duration-300 "
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