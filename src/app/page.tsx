
async function getCategories(): Promise<{data: Array<any>}> {
    const res = await fetch('http://monjiz-server.test/api/categories')

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json();
}

async function getProviders(): Promise<{data: Array<any>}> {
    const res = await fetch('http://monjiz-server.test/api/providers')

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json();
}

export default async function Home({}) {
    const [categories, providers] = await Promise.all([getCategories(), getProviders()]);

    return (
        <main className="px-24 py-10">
            <div className="flex flex-col lg:flex-row gap-2">
                <aside className="w-full lg:w-3/12 mt-4 px-5 lg:p-0">
                    <div className="card">
                        <div className="px-7 pb-6 pt-4">
                            {categories &&
                                <ul>
                                    {categories.data.map((category) => {return (
                                        <li key={category.id} className="block mt-3">
                                            <button className={`text-gray-500 w-full px-3 py-2 rounded-2xl flex justify-between hover:active`}> {/*${selectedCategory === category.id && `active`}*/}
                                                {category.title}
                                                <span className="bg-green-50 text-green-550 w-[30px] h-[30px] flex justify-center items-center text-sm rounded">{category.services_count}</span>
                                            </button>
                                        </li>
                                    )})}
                                </ul>
                            }
                        </div>
                    </div>
                </aside>

                <div className="w-full lg:w-9/12 pl-1 pr-5 lg:px-5 pb-5">
                    <div className="flex items-center gap-2">
                        <h3 className="text-2xl text-gray-800">مقدمي الخدمات</h3>

                        <a href="#" className="text-[12px] text-green-550 underline">عرض الكل</a>
                    </div>

                    {providers &&
                        <div className="flex flex-wrap">
                            {providers.data.map((provider) => {
                                return (
                                    <div key={provider.id} className="w-full sm:w-6/12 xl:w-4/12 mt-4 pl-4">
                                        <div className="card">
                                            <div className="px-4 py-4">
                                                <div className="flex justify-start">
                                                    <div className="ml-3">
                                                        <img className="inline-block w-16 h-16 rounded-full" src={provider.image} alt={provider.user.name}/>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h1 className="text-green-550">{provider.user.name}</h1>
                                                        <p className="text-sm">{provider.category.title}</p>
                                                        <p className="text-xs">{provider.country}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-5 pr-5">
                                                    <h1>{provider.title}</h1>
                                                </div>
                                                <div className="text-right mt-5">
                                                    <button className="btn1 py-1 px-4 text-sm">عرض المزيد</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    }
                </div>
            </div>
        </main>
    );
}
