import { Container } from "../styles/HelpPage";

interface Props {
  pageTitle: string;
  pageText: string;
}

export function Page({ pageTitle, pageText }: Props) {
  return (
    <Container>
      <hr className="sectionLine" />
      <h2 className="pageTitle">{pageTitle}</h2>
      <div className="pageInfo">
        <h3 className="pageText">{pageText}</h3>
      </div>
    </Container>
  );
}
