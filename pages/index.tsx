import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';

const poppins = Poppins({
  subsets: ['latin', 'devanagari', 'latin-ext'],
  weight: '400',
});

function Navbar() {
  const springs = useSpring({
    from: { y: -50 },
    to: { y: 5 },
  });
  const router = useRouter();

  const [menu, setMenu] = useState([
    { label: 'Home', active: true },
    { label: 'Project', active: false },
    { label: 'Tools', active: false },
  ]);
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { theme, setTheme } = useTheme();

  function whenMenuClicked(to: string) {
    router.push(`#${to}`);
    const _menu = menu.map((val: any) => {
      return val.label === to
        ? { ...val, active: true }
        : { ...val, active: false };
    });

    setMenu(_menu);
  }

  function toogleMode() {
    setIsDarkMode(!isDarkMode);
    theme == 'dark' ? setTheme('light') : setTheme('dark');
  }
  return (
    <animated.div
      style={{ ...springs }}
      className={
        'flex justify-around gap-x-3.5 md:justify-center md:gap-x-8 sticky top-5 mb-5'
      }
    >
      <div className="flex justify-center gap-x-2 item-center p-1 px-2 bg-white bg-transparent opacity-90  dark:bg-slate-300 rounded-full">
        {menu.map((val) => (
          <button
            key={val.label}
            className={`p-3 text-sm tracking-wide text-center rounded-full ${
              val.active && 'bg-slate-100 '
            } hover:bg-slate-200`}
            onClick={() => whenMenuClicked(val.label)}
          >
            {val.label}
          </button>
        ))}
      </div>
      <button
        className="bg-white dark:bg-slate-300 hover:bg-slate-200 dark:hover:bg-slate-100 p-3 text-sm tracking-wide text-center rounded-full animate-bounce"
        onClick={() => toogleMode()}
      >
        <Image
          src={`/svg/${isDarkMode ? 'light' : 'dark'}-mode.svg`}
          alt="Switcher"
          width={32}
          height={32}
        />
      </button>
    </animated.div>
  );
}

export default function Home() {
  const springs = useSpring({
    from: { y: 80 },
    to: { y: 0 },
  });
  return (
    <div className={`min-h-screen ${poppins.className}`}>
      <Navbar />
      <animated.main
        style={{ ...springs }}
        className={`flex flex-col items-baseline md:items-center m-28 mx-5 md:m-32 md:px-0`}
      >
        <div className="max-w-xl mb-8">
          <Image
            className="bg-white dark:bg-slate-300 rounded-full mb-8"
            src="/svg/profile.svg"
            alt="Profile Pic"
            width={100}
            height={100}
          />
          <h1 className="text-4xl md:text-5xl leading-snug mb-8 font-semibold dark:text-slate-200">
            Software Engineer
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-slate-200 leading-relaxed font-thin">
            Hi, I&apos;m Fikri. Software Engineer at{' '}
            <a className="underline" href="https://bri.co.id" target="_blank">
              BRI
            </a>{' '}
            also Student at{' '}
            <a
              className="underline"
              href="https://nurulfikri.ac.id"
              target="_blank"
            >
              STT Nurul Fikri.
            </a>{' '}
            Always Ready for New Opportunities and Challenges.{' '}
          </p>
        </div>
        <div className="flex flex-row gap-x-4">
          <a href="https://instagram.com/fikrimuha__" target="_blank">
            <Image
              src="/svg/ig.svg"
              className="hover:bg-slate-500 dark:hover:bg-slate-200 hover:rounded-full"
              alt="Instagram"
              width={30}
              height={30}
            />
          </a>
          <a
            href="https://www.linkedin.com/in/muhammad-fikri-977a50192/"
            target="_blank"
          >
            <Image
              src="/svg/linkedin.svg"
              className="hover:bg-slate-500 dark:hover:bg-slate-200 hover:rounded-full"
              alt="Linkedin"
              width={30}
              height={30}
            />
          </a>
          <a href="https://github.com/fixdev" target="_blank">
            <Image
              src="/svg/gh.svg"
              className="hover:bg-slate-500 dark:hover:bg-slate-200 hover:rounded-full"
              alt="Github"
              width={30}
              height={30}
            />
          </a>
        </div>
      </animated.main>
    </div>
  );
}
