import Authform, { ToggleForm } from "@/components/custom/authform";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function Register() {
  const roles: {
    role: "user" | "admin";
    label: string;
  }[] = [
    { role: "user", label: "User" },
    { role: "admin", label: "Admin" },
  ];
  return (
    <>
      <div className="h-full m-auto max-w-80 min-w-72 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <Tabs defaultValue="user" className="w-full">
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
