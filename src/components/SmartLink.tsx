import { usePathname } from "next/navigation";
import Link from "next/link";

interface SmartLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export function SmartLink({ href, children, ...props }: SmartLinkProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const finalHref = isHome ? href : `/${href}`;

  return (
    <Link href={finalHref} {...props}>
      {children}
    </Link>
  );
}
