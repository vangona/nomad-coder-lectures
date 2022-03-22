import Seo from "../../components/Seo";

export default function Detail({ params }) {
  const [title, id] = params || [];
  
  return (
    <div>
      <h4>
        <Seo title={title} />
        {title}
      </h4>
    </div>
  );
}

export function getServerSideProps({ params: {params} }) {
  return {
    props: {
      params
    },
  };
}