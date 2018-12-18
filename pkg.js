import Button from "./src/component/Button.js";
import Component from "./src/component/Component.js";
import Composite from "./src/component/Composite.js";
import Container from "./src/component/Container.js";
import Form from "./src/component/Form.js";
import Label from "./src/component/Label.js";
import Page from "./src/component/Page.js";
import Panel from "./src/component/Panel.js";
import Select from "./src/component/Select.js";
import SimpleTable from "./src/component/SimpleTable.js";
import TextField from "./src/component/TextField.js";
import Tree from "./src/component/Tree.js";
import Data from "./src/data/Data.js";
import Event from "./src/Event.js";
import ComponentCreator from "./src/generator/ComponentCreator.js";
import FlowLayout from "./src/layout/FlowLayout.js";
import GridLayout from "./src/layout/GridLayout.js";
import Layout from "./src/layout/Layout.js";
import ErrorMessage from "./src/util/ErrorMessage.js";
import Log from "./src/util/Log.js";
import Util from "./src/util/Util.js";
import Watcher from "./src/util/Watcher.js";
export default
 {
  component: {
      Button,
      Component,
      Composite,
      Container,
      Form,
      Label,
      Page,
      Panel,
      Select,
      SimpleTable,
      TextField,
      Tree,
    },
  data: {
      Data,
    },
  Event,
  generator: {
      ComponentCreator,
    },
  layout: {
      FlowLayout,
      GridLayout,
      Layout,
    },
  util: {
      ErrorMessage,
      Log,
      Util,
      Watcher,
    },
}