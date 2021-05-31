import {Route} from 'react-router-dom';
import {Dashboard} from '../components/Dashboard';
import {FormLayoutDemo} from '../components/FormLayoutDemo';
import {InputDemo} from '../components/InputDemo';
import {FloatLabelDemo} from '../components/FloatLabelDemo';
import {InvalidStateDemo} from '../components/InvalidStateDemo';
import {ButtonDemo} from '../components/ButtonDemo';
import {TableDemo} from '../components/TableDemo';
import {ListDemo} from '../components/ListDemo';
import {TreeDemo} from '../components/TreeDemo';
import {PanelDemo} from '../components/PanelDemo';
import {OverlayDemo} from '../components/OverlayDemo';
import {MenuDemo} from '../components/MenuDemo';
import {MessagesDemo} from '../components/MessagesDemo';
import {FileDemo} from '../components/FileDemo';
import {ChartDemo} from '../components/ChartDemo';
import {MiscDemo} from '../components/MiscDemo';
import {DisplayDemo} from '../utilities/DisplayDemo';
import {ElevationDemo} from '../utilities/ElevationDemo';
import {FlexBoxDemo} from '../utilities/FlexBoxDemo';
import {IconsDemo} from '../utilities/IconsDemo';
import {GridDemo} from '../utilities/GridDemo';
import {SpacingDemo} from '../utilities/SpacingDemo';
import {TypographyDemo} from '../utilities/TypographyDemo';
import {TextDemo} from '../utilities/TextDemo';
import {Calendar} from '../pages/Calendar';
import {TimelineDemo} from '../utilities/TimelineDemo';
import {Crud} from '../pages/Crud';
import {EmptyPage} from '../pages/EmptyPage';
import {Documentation} from '../components/Documentation';
import React from 'react';
import DashboardLayout from '../../../layouts/dashboard/DashboardLayout';

export const DemoRoutes = () => {
  return (
    <DashboardLayout>
      <Route path="/demo-dashboard" exact component={Dashboard}/>
      <Route path="/formlayout" component={FormLayoutDemo}/>
      <Route path="/input" component={InputDemo}/>
      <Route path="/floatlabel" component={FloatLabelDemo}/>
      <Route path="/invalidstate" component={InvalidStateDemo}/>
      <Route path="/button" component={ButtonDemo}/>
      <Route path="/table" component={TableDemo}/>
      <Route path="/list" component={ListDemo}/>
      <Route path="/tree" component={TreeDemo}/>
      <Route path="/panel" component={PanelDemo}/>
      <Route path="/overlay" component={OverlayDemo}/>
      <Route path="/menu" component={MenuDemo}/>
      <Route path="/messages" component={MessagesDemo}/>
      <Route path="/file" component={FileDemo}/>
      <Route path="/chart" component={ChartDemo}/>
      <Route path="/misc" component={MiscDemo}/>
      <Route path="/display" component={DisplayDemo}/>
      <Route path="/elevation" component={ElevationDemo}/>
      <Route path="/flexbox" component={FlexBoxDemo}/>
      <Route path="/icons" component={IconsDemo}/>
      <Route path="/grid" component={GridDemo}/>
      <Route path="/spacing" component={SpacingDemo}/>
      <Route path="/typography" component={TypographyDemo}/>
      <Route path="/text" component={TextDemo}/>
      <Route path="/calendar" component={Calendar}/>
      <Route path="/timeline" component={TimelineDemo}/>
      <Route path="/crud" component={Crud}/>
      <Route path="/empty" component={EmptyPage}/>
      <Route path="/documentation" component={Documentation}/>
    </DashboardLayout>
  );
};
