interface PortfolioLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function PortfolioLayout({
  children,
  modal,
}: PortfolioLayoutProps) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
