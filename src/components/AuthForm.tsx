import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { firebaseAuth } from "@/firebase";

// eslint-disable-next-line react-refresh/only-export-components
export enum AuthMode {
    LOGIN,
    SIGN_UP
}

interface AuthFormInput {
    email: string
    password: string
}

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
}).required();

export const AuthForm: React.FC<{ mode: AuthMode }> = ({ mode }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [somethingWrong, setSomethingWrong] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<AuthFormInput>({
        resolver: yupResolver(schema)
    });

    // I created AuthMode to reuse this form for both scenarios. Therefore I use memos to determine labels only on mode change.
    const title: string = useMemo(() => {
        return mode === AuthMode.SIGN_UP ? 'Create your careibu account now' : 'Welcome back Careibu!';
    }, [mode]);

    const submitTitle: string = useMemo(() => {
        return mode === AuthMode.SIGN_UP ? 'Create my account' : 'Sign In!';
    }, [mode]);

    const onSubmit = async (data: AuthFormInput) => {
        setLoading(true);
        setSomethingWrong(false);
        // Don't try this at home
        if (mode === AuthMode.LOGIN) {
            void login(data);
        } else {
            void signup(data);
        }
    }

    const login = async (data: AuthFormInput) => {
        try {
            await signInWithEmailAndPassword(firebaseAuth, data.email, data.password);
        } catch (err) {
            console.log(err);
            setSomethingWrong(true);
        } finally {
            setLoading(false);
        }
    }

    const signup = async (data: AuthFormInput) => {
        try {
            await createUserWithEmailAndPassword(firebaseAuth, data.email, data.password);
        } catch (err) {
            console.log(err);
            setSomethingWrong(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col justify-center w-[360px]">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    {title}
                </h2>

                {somethingWrong && (
                    <div className="text-sm text-red-600">
                        Something went wrong. please check your credentials.
                    </div>
                )}
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                disabled={loading}
                                {...register('email')}
                                type="email"
                                required
                                autoComplete="email"
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>

                        <p className="text-sm text-gray-500 mt-2">{errors.email ? "Please enter a valid e-mail" : ""}</p>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                disabled={loading}
                                {...register('password')}
                                type="password"
                                required
                                autoComplete="current-password"
                                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">{errors.password ? "Please enter a valid password (min 8 characters)" : ""}</p>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
                        >
                            {submitTitle}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}