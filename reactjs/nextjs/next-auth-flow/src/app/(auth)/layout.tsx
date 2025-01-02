const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
