import PayWithRazorpay from "@/components/PayWithRazorpay";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="group my-10 flex w-full max-w-xs flex-col overflow-hidden border border-gray-100 bg-white shadow-md">
        <a className="relative flex h-60 overflow-hidden" href="#">
          <img
            className="absolute top-0 right-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1072&q=80"
            alt="product image"
          />
        </a>
        <div className="mt-4 px-5 pb-5">
          <a href="#">
            <h5 className="text-xl tracking-tight text-slate-900">
              Lululemon Comfort Tee - White
            </h5>
          </a>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold text-slate-900">$79</span>
              <span className="text-sm text-slate-900 line-through">$99</span>
            </p>
          </div>
          <PayWithRazorpay />
        </div>
      </div>
    </main>
  );
}
