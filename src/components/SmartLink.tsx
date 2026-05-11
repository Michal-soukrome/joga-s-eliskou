import { usePathname } from "next/navigation";
import Link from "next/link";

interface SmartLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function SmartLink({
  href,
  children,
  onClick,
  ...props
}: SmartLinkProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const finalHref = isHome ? href : `/${href}`;

  return (
    <Link href={finalHref} {...props} onClick={onClick}>
      {children}
    </Link>
  );
}
