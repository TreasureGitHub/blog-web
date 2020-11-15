import React, {Component, PureComponent} from "react";
import moment from "moment";
import {connect} from "dva";
import {defaultParams} from 'common/const'
import apiConfig from "config";
import 'antd/dist/antd.css'

import {
  Table,
  Input,
  Popconfirm,
  Form,
  Button,
  Divider

} from 'antd';

const {
  tag: {
    deleteTagById, createTag, updateTagByID
  }
} = apiConfig

const EditableContext = React.createContext();

class EditableCell extends PureComponent {

  renderCell = ({getFieldDecorator}) => {
    const {
      editing,
      dataIndex,
      title,
      record,
      index,
      children,
      ...restProps
    } = this.props;

    return (
      <td {...restProps}>
        {
          editing ? (
            <Form.Item style={{margin: 0,}}>
              {getFieldDecorator(dataIndex, {
                rules: [
                  {
                    required: true,
                    message: `请输入 ${title}!`,
                  },
                ],
                initialValue: record[dataIndex],
              })(
                <Input/>
              )}
            </Form.Item>
          ) : (
            children
          )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class Tag extends Component {

  state = {
    searchParams: {
      ...defaultParams
    },
    editId: undefined
  }

  componentDidMount() {
    this.listTag()
  }

  listTag = () => {
    const {_$listTag} = this.props
    const {searchParams} = this.state;
    console.log('---------listTag')
    _$listTag(searchParams)
  }

  createTag = (payload) => {
    createTag(payload).then(this.listTag)
  }

  deleteTagById = (id) => {
    deleteTagById({id}).then(this.listTag)
  }

  updateTagById = (payload) => {

    console.log(payload)

    const {_$updateTagById} = this.props
    _$updateTagById(payload)

      // .then(this.listTag)
  }

  handleAdd = () => {
    const data = {
      name: 'tag',
    };

    this.createTag(data)
  }

  onChangePage = (page, pageSize) => {
    const {searchParams} = this.state
    const newParams = {page: page, limit: pageSize}
    this.setState({searchParams: {...searchParams, ...newParams}, editId: undefined}, this.listTag)
  }

  // 是否编辑
  isEditing = record => record.id === this.state.editId;

  // 取消编辑
  cancelEdit = () => {
    this.setState({editId: undefined});
  };

  save(form, id) {
    form.validateFields((error, values) => {
      if (error) {
        return;
      }

      this.updateTagById({id, ...values})
      this.setState({editId: undefined})
    });
  }

  edit(id) {
    this.setState({editId: id});
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const {tagList, tagTotal, loading} = this.props;

    const {searchParams: {page, limit}} = this.state;

    console.log('--------------------loading')
    console.log(loading)

    const orgColumns = [
      {
        title: 'ID',
        dataIndex: 'id',
        width: '10%',
        editable: false,
      },
      {
        title: '创建时间',
        dataIndex: 'gmtCreate',
        width: '18%',
        editable: false,
        render: (gmtCreate) => (moment(gmtCreate).format('YYYY-MM-DD HH:mm:ss'))
      },
      {
        title: '最后更新时间',
        dataIndex: 'gmtModified',
        width: '18%',
        editable: false,
        render: (gmtModified) => (moment(gmtModified).format('YYYY-MM-DD HH:mm:ss'))
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const {editId} = this.state;
          const editable = this.isEditing(record);
          return editable ? (
              <span>
                                <EditableContext.Consumer>
                                    {form => (
                                      <a onClick={() => this.save(form, record.id)}
                                         style={{marginRight: 8}}>
                                        保存
                                      </a>
                                    )}
                                </EditableContext.Consumer>
                                <Popconfirm title="确定要取消吗?"
                                            onConfirm={() => this.cancelEdit(record.key)}>
                                    <a>取消</a>
                                </Popconfirm>
                            </span>) :
            (
              <div>
                <a disabled={editId !== undefined}
                   onClick={() => this.edit(record.id)}>编辑</a>
                <Divider type="vertical"/>
                <Popconfirm title="确定要取消吗?"
                            onConfirm={() => this.deleteTagById(record.id)}>
                  <a>删除</a>
                </Popconfirm>
              </div>
            );
        },
      },
    ];

    const columns = orgColumns.map(column => {
      if (!column.editable) {
        return column;
      }

      return {
        ...column,
        onCell: record => ({
          record,
          dataIndex: column.dataIndex,
          title: column.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Button onClick={this.handleAdd} type="primary" style={{marginBottom: 16}}>
          Add Tag
        </Button>
        <Table
          components={components}
          bordered
          dataSource={tagList}
          columns={columns}
          loading={loading}
          pagination={{
            showTotal: () => (`共 ${tagTotal} 条记录`),
            pageSize: limit,
            current: page,
            total: tagTotal,
            showSizeChanger: true,
            showQuickJumper: true,
            onChange: this.onChangePage,
            onShowSizeChange: this.onChangePage,
          }}
        />
      </EditableContext.Provider>
    );
  }
}

const mapStateToProps = ({tag, loading, test}) => ({
  ...tag,
  loading: loading.effects['tag/listTag'],
})

const mapDispatchToProps = (dispatch) => ({
  _$listTag(payload) {
    dispatch({
      type: 'tag/listTag',
      payload
    })
  },
  _$updateTagById(payload) {
    dispatch({
      type: 'tag/updateTagById',
      payload
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Tag));
