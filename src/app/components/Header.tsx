import Link from 'next/link'

export default  function Header() {
    return (
        <header className="bg-white sticky top-0 border-b px-5 py-3">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link href="#"  className="text-5xl text-green-550 logo ml-5">منجز</Link>
                        <ul className="mr-10 hidden md:block">
                            <li className="inline-block ml-7"><Link href="#" className={`inline-block px-5 py-3 rounded-2xl hover:active text-gray-500`}>الرئيسية</Link></li>
                            <li className="inline-block ml-7"><Link href="#"  className="inline-block px-5 py-3 rounded-2xl hover:active text-gray-500">حسابي</Link></li>
                        </ul>
                    </div>
                    <div className="hidden md:block">
                        <Link href="#" className="text-gray-500 hover:text-green-550">تسجيل الدخول</Link>
                        <Link href="#" className="btn1 mr-5">انشاء حساب</Link>
                    </div>
                    <button className="block md:hidden text-2xl">Menu</button>
                </div>
            </div>
        </header>
    );
}