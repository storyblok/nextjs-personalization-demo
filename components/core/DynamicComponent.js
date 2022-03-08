import CallToAction from "components/blocks/CallToAction";
import Placeholder from "components/core/Placeholder";
import Page from "components/content-types/Page";
import RichText from "components/blocks/RichText";
import Catalog from "components/blocks/Catalog";
import PersonalizedContent from "components/blocks/PersonalizedContent";

const Components = {
  call_to_action: CallToAction,
  page: Page,
  rich_text: RichText,
  catalog: Catalog,
  personalized_content: PersonalizedContent,
};

const DynamicComponent = ({ blok }) => {
  if (typeof Components[blok.component] !== "undefined") {
    const Component = Components[blok.component];
    return <Component blok={blok} />;
  }
  return <Placeholder componentName={blok.component} />;
};

export default DynamicComponent;
