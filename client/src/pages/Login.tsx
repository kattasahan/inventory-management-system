import Authform, { ToggleForm } from "@/components/custom/auth-form";
import { Card, CardContent } from "@/components/ui/card";

function Login() {
  return (
    <>
      <div className="m-auto max-w-80 min-w-72 mt-20">
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
        </div>
        <Card className="max-w-80 min-w-72 w-full">
          <CardContent className="flex flex-col justify-center gap-2">
            <Authform type="login" />
          </CardContent>
        </Card>
        <ToggleForm type="login" />
      </div>
    </>
  );
}

export default Login;
