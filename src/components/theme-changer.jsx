import React from 'react';
import { useTheme } from "next-themes";

const Theme = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <div className='z-50 fixed bottom-0 right-0 flex justify-center bg-slate-400 items-center p-3 m-4 dark:bg-zinc-800 rounded'>
            {currentTheme === 'dark' ? (
                <div
                    className="group transition-all duration-200 flex justify-center rounded-md p-2"
                    onClick={() => setTheme('light')}
                    aria-label="Switch to light mode"
                >
                    <svg
                        className="size-7"
                        width="50px"
                        height="50px"
                        viewBox="0 0 24 24"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            className="fill-white group-hover:fill-zinc-500 transition-all duration-500"
                            d="M18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6C15.3137 6 18 8.68629 18 12Z"
                            fill="#FFF"
                        />
                        <path
                            fillRule="evenodd"
                            className="fill-white group-hover:fill-zinc-500 transition-all duration-500"
                            clipRule="evenodd"
                            d="M12 1.25C12.4142 1.25 12.75 1.58579 12.75 2V3C12.75 3.41421 12.4142 3.75 12 3.75C11.5858 3.75 11.25 3.41421 11.25 3V2C11.25 1.58579 11.5858 1.25 12 1.25ZM4.39861 4.39861C4.6915 4.10572 5.16638 4.10572 5.45927 4.39861L5.85211 4.79145C6.145 5.08434 6.145 5.55921 5.85211 5.85211C5.55921 6.145 5.08434 6.145 4.79145 5.85211L4.39861 5.45927C4.10572 5.16638 4.10572 4.6915 4.39861 4.39861ZM19.6011 4.39887C19.894 4.69176 19.894 5.16664 19.6011 5.45953L19.2083 5.85237C18.9154 6.14526 18.4405 6.14526 18.1476 5.85237C17.8547 5.55947 17.8547 5.0846 18.1476 4.79171L18.5405 4.39887C18.8334 4.10598 19.3082 4.10598 19.6011 4.39887Z"
                            fill="#FFF"
                        />
                    </svg>
                </div>
            ) : (
                <div
                    className="group transition-all duration-200 rounded-md flex justify-center items-center p-2"
                    onClick={() => setTheme('dark')}
                    aria-label="Switch to dark mode"
                >
                    <svg
                        className="flex size-7 justify-center items-center"
                        width="50px"
                        height="50px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            className="stroke-white group-hover:stroke-zinc-800 transition-all duration-500"
                            d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            )}
        </div>
    );
};

export default Theme;
