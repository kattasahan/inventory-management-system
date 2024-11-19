import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/default";
import { register } from "@/redux/slicers/authSlicer";
import { RegisterPayload } from "@/models/auth.model";

export default function Authform({
  type,
  role,
}: {
  role?: "USER" | "ADMIN";
  type: "login" | "register";
}) {
  const formInitState = { username: "", email: "", password: "", secret: "" };
  const [form, setForm] = useState(formInitState);
  const [show, setShow] = useState({ showPassword: false, showSecret: false });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const userData = useAppSelector((state) => state.auth);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const submitForm = () => {
    const validateForm = {
      ADMIN: !form.username || !form.secret || !form.email || !form.password,
      USER: !form.username || !form.email || !form.password,
      LOGIN: !form.email || !form.password,
    };

    const missingFields = () =>
      toast({
        variant: "destructive",
        title: "Required fields are missing!",
        description: "Please enter all fields.",
      });

    if (type === "register" && role) {
      if (validateForm[role]) {
        missingFields();
        return;
      }

      const payload: RegisterPayload = {
        ...form,
        role,
      };

      dispatch(register(payload)).then((action) => {
        if (action.payload?.success) {
          localStorage.setItem("role", action.payload?.role);

          toast({
            title: action.payload?.message,
          });
          navigate("/products");
          return;
        }
        if (userData.error) {
          toast({
            variant: "destructive",
            title: userData.error.message,
          });
        }
      });
    } else {
      if (validateForm.LOGIN) {
        missingFields();
        return;
      }
    }
  };

  const clearForm = () => {
    setForm(formInitState);
  };
  return (
    <>
      {type === "register" && (
        <div className="w-full">
          <Label htmlFor="username">Name</Label>
          <Input
            id="username"
            value={form.username}
            type="text"
            placeholder="John"
            required={type === "register" ? true : false}
            onChange={handleInput}
          />
          <span className="text-xs text-red-500">
            Name should be 3-23 characters
          </span>
        </div>
      )}
      <div className="w-full">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={form.email}
          type="email"
          placeholder="john@gmail.com"
          required
          onChange={handleInput}
        />
        <span className="text-xs text-red-500">Invalid Email</span>
      </div>
      <div className="w-full">
        <Label htmlFor="password">Password</Label>
        <div className="flex w-full gap-1">
          <Input
            id="password"
            value={form.password}
            type={show.showPassword ? "text" : "password"}
            placeholder="zFgr&5sL"
            className="grow"
            pattern="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/"
            onChange={handleInput}
            required
          />
          <Button
            id="showPassword"
            variant="outline"
            size="icon"
            onClick={() =>
              setShow((prev) => ({ ...prev, showPassword: !prev.showPassword }))
            }
          >
            {show.showPassword ? <Eye /> : <EyeClosed />}
          </Button>
        </div>
        <span className="text-xs text-red-500">
          Password should be 8-23 characters
        </span>
      </div>
      {type === "register" && role === "ADMIN" && (
        <div className="w-full">
          <Label htmlFor="secret">Secret</Label>
          <div className="flex w-full gap-1">
            <Input
              id="secret"
              value={form.secret}
              type={show.showSecret ? "text" : "password"}
              placeholder="********"
              className="w-full"
              required
              onChange={handleInput}
            />
            <Button
              id="showSecret"
              variant="outline"
              size="icon"
              onClick={() =>
                setShow((prev) => ({ ...prev, showSecret: !prev.showSecret }))
              }
            >
              {show.showSecret ? <Eye /> : <EyeClosed />}
            </Button>
          </div>
        </div>
      )}
      <div className="w-full flex justify-end gap-2 mt-2">
        <Button variant="secondary" className="w-[50%]" onClick={clearForm}>
          Clear
        </Button>
        <Button variant="default" className="w-[50%]" onClick={submitForm}>
          {type === "register" ? "Register" : "Login"}
        </Button>
      </div>
    </>
  );
}

export function ToggleForm({ type }: { type: "login" | "register" }) {
  return (
    <div className="flex justify-end w-full">
      {/* {type === "login" ? (
        <div>
          don't have an account?{" "}
          <Link className="underline" to="/register">
            Register
          </Link>
        </div>
      ) : (
        <div>
          already have an account?{" "}
          <Link className="underline" to="/login">
            Login
          </Link>
        </div>
      )} */}
      <div>
        {type === "login"
          ? "don't have an account? "
          : "already have an account? "}
        <Link
          className="underline"
          to={type === "login" ? "/register" : "/login"}
        >
          {type === "login" ? "Register" : "Login"}
        </Link>
      </div>
    </div>
  );
}
