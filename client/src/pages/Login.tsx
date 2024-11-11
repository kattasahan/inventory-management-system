import Authform, { ToggleForm } from "@/components/custom/authform";
import { Card, CardContent } from "@/components/ui/card";

function Login() {
  return (
    <>
      <div className="m-auto max-w-80 min-w-72 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
