import { NavLink as RouterNavLink } from "react-router";

export default function HeaderNavLink({
  to,
  children,
  activeClassName,
  inactiveClassName,
  ...props
}) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `text-sm font-medium transition-all ${
          isActive ? activeClassName : inactiveClassName
        }`
      }
      {...props}
    >
      {children}
    </RouterNavLink>
  );
}
