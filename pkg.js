import srccomponentComponentjs from "./src/component/Component.js";
import srccomponentCompositejs from "./src/component/Composite.js";
import srccomponentContainerjs from "./src/component/Container.js";
import srccomponentFormjs from "./src/component/Form.js";
import srccomponentLabeljs from "./src/component/Label.js";
import srccomponentPagejs from "./src/component/Page.js";
import srccomponentPaneljs from "./src/component/Panel.js";
import srccomponentSelectjs from "./src/component/Select.js";
import srccomponentSimpleTablejs from "./src/component/SimpleTable.js";
import srccomponentTextFieldjs from "./src/component/TextField.js";
import srccomponentTreejs from "./src/component/Tree.js";
import srcdataCollectionjs from "./src/data/Collection.js";
import srcdataDatajs from "./src/data/Data.js";
import srcdataModeljs from "./src/data/Model.js";
import srcEventjs from "./src/Event.js";
import srcgeneratorComponentCreatorjs from "./src/generator/ComponentCreator.js";
import srclayoutFlowLayoutjs from "./src/layout/FlowLayout.js";
import srclayoutGridLayoutjs from "./src/layout/GridLayout.js";
import srclayoutLayoutjs from "./src/layout/Layout.js";
import srcuiBasicViewjs from "./src/ui/BasicView.js";
import srcuiButtonjs from "./src/ui/Button.js";
import srcuiTreejs from "./src/ui/Tree.js";
import srcutilErrorMessagejs from "./src/util/ErrorMessage.js";
import srcutilLogjs from "./src/util/Log.js";
import srcutilUtiljs from "./src/util/Util.js";
import srcutilWatcherjs from "./src/util/Watcher.js";
export default
 {
  component: {
      Component: srccomponentComponentjs,
      Composite: srccomponentCompositejs,
      Container: srccomponentContainerjs,
      Form: srccomponentFormjs,
      Label: srccomponentLabeljs,
      Page: srccomponentPagejs,
      Panel: srccomponentPaneljs,
      Select: srccomponentSelectjs,
      SimpleTable: srccomponentSimpleTablejs,
      TextField: srccomponentTextFieldjs,
      Tree: srccomponentTreejs,
    },
  data: {
      Collection: srcdataCollectionjs,
      Data: srcdataDatajs,
      Model: srcdataModeljs,
    },
  Event: srcEventjs,
  generator: {
      ComponentCreator: srcgeneratorComponentCreatorjs,
    },
  layout: {
      FlowLayout: srclayoutFlowLayoutjs,
      GridLayout: srclayoutGridLayoutjs,
      Layout: srclayoutLayoutjs,
    },
  ui: {
      BasicView: srcuiBasicViewjs,
      Button: srcuiButtonjs,
      Tree: srcuiTreejs,
    },
  util: {
      ErrorMessage: srcutilErrorMessagejs,
      Log: srcutilLogjs,
      Util: srcutilUtiljs,
      Watcher: srcutilWatcherjs,
    },
}