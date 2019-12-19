// pages/index.js

import withLayout from '../comps/Layout';
//import "../pages/index.css";
import '../style.css';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Page = () => <Button>Hello Next.js</Button>;

export default withLayout(Page);
