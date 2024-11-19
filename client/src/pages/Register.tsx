import Authform, { ToggleForm } from "@/components/custom/auth-form";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Register() {
  const roles: {
    role: "USER" | "ADMIN";
    label: string;
  }[] = [
    { role: "USER", label: "User" },
    { role: "ADMIN", label: "Admin" },
  ];
  return (
    <>
      <div className="h-[90%] m-auto max-w-80 min-w-72 mt-20">
        <div className="flex justify-center">
          <h2 className="text-2xl font-bold mb-4">Register</h2>
        </div>
        <Tabs defaultValue="USER" className="w-full">
          <TabsList className="w-full">
            {roles.map((role) => (
              <TabsTrigger
                key={role.role}
                value={role.role}
                className="w-[50%]"
              >
                {role.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {roles.map((role) => (
            <TabsContent key={role.role} value={role.role}>
              <Card className="max-w-80 min-w-72">
                <CardContent className="flex flex-col justify-center gap-2">
                  <Authform role={role.role} type="register" />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
        <ToggleForm type="register" />
      </div>
    </>
  );
}

export default Register;
