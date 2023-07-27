"use client"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { signIn, getSession } from "next-auth/react"
import {useState} from "react"
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import Alert from "@/app/(components)/ui/Alert"

const schema = yup.object({
    email: yup.string().required("حقل البريد الالكتروني مطلوب"),
    password: yup.string().required("حقل كلمة المرور مطلوب"),
}).required();

type FormData = yup.InferType<typeof schema>;

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const {register, resetField, handleSubmit, formState: { errors }} = useForm<FormData>({resolver: yupResolver(schema)})

    const onSubmit = async (data: FormData) => {
        setLoading(true)

        const response = await signIn('credentials', {...data, redirect: false})

        if (!response?.error) {
            const session = await getSession()

            if (session?.user) {
                router.refresh()

                router.replace('/')
            }

            setLoading(false)
        }

        if (response?.error) {
            response?.error
                ? setError(response.error)
                : setError("حدث خطأ اثناء عملية تسجيل الدخول")

            setLoading(false)
            resetField('password')
        }
    }

    return (
        <main className="px-24 py-10">
            <div className="w-11/12 lg:w-5/12 mx-auto">
                <div className="card px-5 py-5">
                    <h1 className="text-center mt-5 text-gray-500 text-3xl">تسجيل الدخول</h1>
                    <form className="mt-10 px-2 lg:px-10" onSubmit={handleSubmit(onSubmit)}>
                        {error && <Alert type="danger">{error}</Alert>}
                        <div className="mb-5">
                            <label className="block text-gray-500">البريد الإلكتروني</label>
                            <input {...register('email')} className="input mt-1" name="email" type="text" />
                            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
                        </div>

                        <div className="mb-5">
                            <label className="block text-gray-500">كلمة المرور</label>
                            <input {...register('password')} className="input mt-1" name="password" type="password" />
                            <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
                        </div>

                        <div className="text-center pt-3">
                            <button type="submit" className="btn1 min-w-[135px] flex items-center gap-2 mx-auto" disabled={loading}>
                                تسجيل الدخول
                                {loading && <FontAwesomeIcon icon={faSpinner} className="spinner text-[16px]" />}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}