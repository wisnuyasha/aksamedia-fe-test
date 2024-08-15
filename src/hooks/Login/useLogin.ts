import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { User } from "../../constants/Users";

const useLogin = () => {
  const navigate = useNavigate();
  const { mutateName } = useUserStore();

  const handleLogin = ({
    name,
    password,
    setErrors,
  }: {
    name: string;
    password: string;
    setErrors: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    if (name === User.name && password === User.password) {
      setErrors("");
      mutateName(name);
      navigate("/");
    } else {
      setErrors("Wrong name or password");
    }
  };

  return { handleLogin };
};

export default useLogin;
