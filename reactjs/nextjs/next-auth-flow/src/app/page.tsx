import getMe from "./get-me";

export default async function Home() {
  let me = await getMe() as any
  // console.log(me);
  
  return (
    <section>
      <div>
        <h1>Home</h1>
        {me && (
          <p>{JSON.stringify(me)}</p>
        )}  
      </div>
    </section>
  )
}
