// Partly copied from https://github.com/hyperlane-xyz/hyperlane-website/blob/main/src/components/nav/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';

import { DiscordIcon, GithubIcon, TwitterIcon } from '@hyperlane-xyz/widgets';
import { docLinks, links } from '../../consts/links';
import Logo from '../../images/logos/logo.svg';

const footerLinks1 = [
  { title: 'Docs', url: docLinks.home, external: true },
  { title: 'Homepage', url: links.home, external: true },
  { title: 'Chains', url: docLinks.chains, external: true },
];

const footerLinks2 = [
  { title: 'Careers', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', external: true },
  {
    title: 'Bounty',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    external: true,
  },
  { title: 'Brand', url: links.brand, external: true },
];

const footerLinks3 = [
  { title: 'X', url: links.twitter, external: true, icon: <TwitterIcon color="#fff" /> },
  { title: 'Discord', url: links.discord, external: true, icon: <DiscordIcon color="#fff" /> },
  { title: 'Github', url: links.github, external: true, icon: <GithubIcon color="#fff" /> },
];

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-transparent to-black/40 px-8 pb-5 pt-14 text-black">
      <div className="flex flex-col items-center justify-between gap-10 sm:flex-row">
        <div className="flex items-center justify-center">
          <div className="ml-2 h-12 w-12 sm:h-14 sm:w-14">
          <Image src={Logo} alt="" />
          </div>
          <div className="ml-6 space-y-1 text-lg font-medium sm:text-xl">
            <div>Go interchain</div>
            <div>with Bridge Chain</div>
          </div>
        </div>
        <nav className="flex font-medium">
          <ul className={`${styles.linkCol} mr-14`}>
            {footerLinks1.map((item) => (
              <li className="" key={item.title}>
                <Link
                  className={styles.linkItem}
                  target={item.external ? '_blank' : '_self'}
                  href={item.url}
                >
                  <div className="">{item.title}</div>
                </Link>
              </li>
            ))}
          </ul>
          <ul className={`${styles.linkCol} mr-14`}>
            {footerLinks2.map((item) => (
              <li key={item.title}>
                <Link
                  className={styles.linkItem}
                  target={item.external ? '_blank' : '_self'}
                  href={item.url}
                >
                  <div className="">{item.title}</div>
                </Link>
              </li>
            ))}
          </ul>
          <ul className={`${styles.linkCol}`}>
            {footerLinks3.map((item) => (
              <li key={item.title}>
                <Link
                  className={styles.linkItem}
                  target={item.external ? '_blank' : '_self'}
                  href={item.url}
                >
                  {item?.icon && <div className="mr-4 w-5">{item?.icon}</div>}
                  <div className="">{item.title}</div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

const styles = {
  linkCol: 'flex flex-col gap-2',
  linkItem: 'flex items-center capitalize text-decoration-none hover:underline underline-offset-2',
};
