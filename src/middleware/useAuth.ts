import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";
import React from "react";

const useAuthLogin = () => {
  const navigate = useNavigate();
  const { userName } = useUserStore();

  React.useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName === "agus" && userName === "agus") {
      navigate("/");
    }
  }, [navigate, userName]);
};

const useAuthHome = () => {
  const navigate = useNavigate();
  const { userName } = useUserStore();

  React.useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (!userName && !storedName) {
      navigate("/login");
    }
  }, [navigate, userName]);
};

export { useAuthHome, useAuthLogin };
