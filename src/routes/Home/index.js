import React, {Component,Fragment} from 'react'

import {
  HomeWrapper,
  HomeLeft,
  HomeRight,
  HomeRightFixed,
} from "./style";

/**
 * @author ffl.lff
 * @date 2020/2/2
 */

class Home extends Component {

  componentDidMount() {
    this.props.changeHomeData();
  }

  render() {
    return (
      <Fragment>
        {/*<Header/>*/}
        {/*<HomeWrapper>*/}
        {/*  <HomeLeft>*/}
        {/*    <List/>*/}
        {/*  </HomeLeft>*/}
        {/*  <HomeRight>*/}
        {/*    <HomeRightFixed>*/}
        {/*      <Intro/>*/}
        {/*      <Tag/>*/}
        {/*    </HomeRightFixed>*/}
        {/*  </HomeRight>*/}
        {/*  <BackTop/>*/}
        {/*</HomeWrapper>*/}
        {/*<Footer/>*/}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  changeHomeData() {
    dispatch(actionCreators.getHomeInfo());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
