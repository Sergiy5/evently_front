import { Container } from "./Container";
import { ListEvents } from "./ListEvents";

interface AllEventsprops {}
export const AllEvents: React.FC<AllEventsprops> = () => {

    return (
      <Container className={`flex flex-col gap-8`}>
        <h1>Усі події</h1>
        <ListEvents events={12} />
      </Container>
    );
};