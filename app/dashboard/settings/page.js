import ThemeSwitcher from "./_components/ThemeSwitcher";


export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold m10">Обери свою тему:</h1>
      <ThemeSwitcher />
     
    </div>
  );
}
