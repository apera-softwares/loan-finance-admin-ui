"use client";
import { BACKEND_API } from "@/api";
import { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { getUserProfile } from "@/lib/redux/slices/loginPersonProfile";

export default function SuccessPage() {
  const dispatch = useAppDispatch();
  const [linkToken, setLinkToken] = useState<string>("");
  const [publicToken, setPublicToken] = useState<string>("");
  //const [account, setAccount] = useState();
  const { user: loggedInUser } = useAppSelector((state) => state.user);
  const { userProfile } = useAppSelector((state) => state.userProfile);

  useEffect(() => {
    getInfo();
    createAndFetchLinkToken();
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
      setPublicToken(public_token);
      console.log("success", public_token, metadata);
      // send public_token to server
    },
  });

  useEffect(() => {
    if (!publicToken) return;
    fetchData();
  }, [publicToken]);

  async function fetchData() {
    try {
      const exchangeData = await exchangePublicToken();
      const transactionData = await fetchTransactions(exchangeData.accessToken);
      console.log("transation data", transactionData);
    } catch (err) {
      console.error("Failed to fetch transactions", err);
    }
  }

  async function fetchTransactions(accessToken: string) {
    try {
      const response = await axios.get(
        `${BACKEND_API}api/transactions?access_token=${encodeURIComponent(
          accessToken
        )}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedInUser?.token}`,
          },
        }
      );

      const transactionData = response.data;
      console.log("Transaction data", transactionData);
      return transactionData;
    } catch (error) {
      console.error("Error fetching transactions:", error);
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
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedInUser?.token}`,
          },
        }
      );

      const exchangeData = response.data;
      console.log("accessToken", exchangeData);
      await dispatch(getUserProfile());
      return exchangeData;
    } catch (error) {
      console.error("Error exchanging public token:", error);
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
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedInUser?.token}`,
          },
        }
      );

      const data = response.data;
      console.log(data, "fetch link token data");
      setLinkToken(data.link_token);
    } catch (error) {
      console.error("Error fetching link token:", error);
    }
  }

  async function getInfo() {
    try {
      const payload = {};
      const response = await axios.post(`${BACKEND_API}api/info`, payload, {
        headers: {
          "ngrok-skip-browser-warning": "true",
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInUser?.token}`,
        },
      });

      const data = response.data;
      console.log(data, "/api/info");
    } catch (error) {
      console.error("Error fetching link token:", error);
    }
  }

  console.log("user profile", userProfile);
  return (
    <div className="w-full max-w-xl bg-white rounded-xl border border-gray-200 px-6 py-8 text-center shadow-md ">
      <h2 className="mb-4 text-xl font-semibold ">
        Business Bank Statements
      </h2>

      <p className="mb-6 text-gray-700">
        We partner with <strong>PLAID</strong> to verify your business activity
        and assess your eligibility for financing. When connecting your account,
        you maintain control at all times.
      </p>

      {userProfile?.accountConnectedWithPlaid ? (
        <span className="rounded-md bg-green-600 px-6 py-2 font-medium text-white  ">
          Connected
        </span>
      ) : (
        <button
          className="rounded-md bg-primary px-6 py-2 font-medium text-white  hover:bg-primary-hover transition-all duration-300 "
          onClick={() => open()}
          disabled={!ready}
        >
          Connect Now
        </button>
      )}
    </div>
  );
}
