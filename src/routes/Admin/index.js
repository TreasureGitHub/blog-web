import React, {Component} from "react";

import Article from "./Article";
import Tag from "./Tag";
import User from './User'
import Comment from "./Comment";
import {Icon, Layout, Menu, Breadcrumb} from "antd";
import {Back, BreadcrumbWrapper} from './style'
import Link, {connect} from "dva";

const {Header, Content, Sider} = Layout

class Admin extends Component {

  state = {
    collapsed: false,
    selectKey: 'tag',
  }

  componentDidMount() {
    this.listTag()
  }

  listTag = () => {
    const {_$listTag} = this.props
    _$listTag()

  }

  onCollapse = (collapsed) => {
    this.setState({collapsed})
  }

  changeSelectKey = (e) => {
    this.setState({selectKey: e.key})
  }

  render() {

    const {collapsed, selectKey} = this.state

    const {tagList, tagTotal} = this.props

    console.log(tagList)
    console.log(tagTotal)

    const selectPage = () => {
      if (selectKey === 'tag') {
        return <Tag/>
      } else if (selectKey === 'article') {
        return <Article/>
      } else if (selectKey === 'user') {
        return <User/>
      } else if (selectKey === 'comment') {
        return <Comment/>
      }
    }

    return (
      <Layout>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          width='240'
          onCollapse={this.onCollapse}
        >
          <Icon className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
          />
          <Back collapsed={collapsed}>
            <Link to='/' className='link'>
              返回首页
            </Link>
          </Back>

          <Menu mode='inline'
                theme='dark'
                onClick={this.changeSelectKey}
          >
            <Menu.Item key="tag">
              <span>标签</span>
            </Menu.Item>
            <Menu.Item key="article">
              <span>文章</span>
            </Menu.Item>
            <Menu.Item key="user">
              <span>用户</span>
            </Menu.Item>
            <Menu.Item key="comment">
              <span>评论</span>
            </Menu.Item>
          </Menu>
        </Sider>

        <Header style={{background: '#fff', padding: 0}}>
          <BreadcrumbWrapper>
            <Breadcrumb>
              <Breadcrumb.Item>Admin</Breadcrumb.Item>
              <Breadcrumb.Item>Tag</Breadcrumb.Item>
            </Breadcrumb>
          </BreadcrumbWrapper>
        </Header>
        <Content style={{margin: '24px 16px', padding: '24px', background: '#fff', minHeight: 200}}>
          123
        </Content>
      </Layout>
    )
  }
}

const mapStateToProps = (tag, loading) => ({
  ...tag,
  // loading: loading.effect['tag/listTag']
})

const mapDispatchToProps = dispatch => ({
  // _$listTag(e) {
  //   dispatch({
  //     type: 'tag/listTag',
  //     payload: e.key
  //   })
  // }
  _$listTag: data => {
    return dispatch({
      type: 'tag/listTag',
      payload: data
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
