/**
 * 基于swfupload与extjs 4.0结合二次开发的批量上传组件
 * 多文件批量上传组件
 * for extjs4.0
 */

Ext.define('ManagementSystem.view.uploadFile.uploadPanel.UploadPanel', {
    //requires: 'ManagementSystem.view.ExcelYuLanWin',
    extend: 'Ext.grid.Panel',
    alias: 'widget.uploadpanel',
    xtype: 'uploadpanel',
    width: 420, height: 200,
    selType: 'cellmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        })
    ],
    columns: [
        {xtype: 'rownumberer'},
        {text: '文件名', flex: 1.5, dataIndex: 'fileName', menuDisabled: false, sortDisabled: false},
        {
            text: '大小(3M以内)',flex:1.2, dataIndex: 'size', menuDisabled: false, sortDisabled: false, renderer: function (v) {
            return Ext.util.Format.fileSize(v);
        }
        },
        {
            text: '进度',
            flex:1.5,
            menuDisabled: false,
            sortDisabled: false,
            dataIndex: 'percent',
            renderer: function (v) {
                var html =
                    '<div>' +
                    '<div style="border:1px solid #008000;height:10px;width:115px;margin:2px 0px 1px 0px;float:left;">' +
                    '<div style="float:left;background:#FFCC66;width:' + v + '%;height:8px;"><div></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                return html;
            }
        },
        {
            text: '状态',
            flex:1,
            menuDisabled: false,
            sortDisabled: false,
            dataIndex: 'status',
            renderer: function (v) {
                //debugger;
                var status;
                if (v == -1) {
                    status = "等待上传";
                } else if (v == -2) {
                    status = "上传中...";
                } else if (v == -3) {
                    status = "<div style='color:red;'>上传失败</div>";
                } else if (v == -4) {
                    status = "上传成功";
                } else if (v == -5) {
                    status = "停止上传";
                }
                return status;
            }
        },
        {
            xtype: 'actioncolumn', menuDisabled: false, sortDisabled: false, flex:.5,
            items: [
                {
                    iconCls: 'remove', tooltip: '移除',
                    handler: function (grid, rowIndex, colIndex) {
                        var id = grid.store.getAt(rowIndex).get('id');
                        grid.store.remove(grid.store.getAt(rowIndex));
                    }
                }
            ]
        }
    ],
    store: Ext.create('Ext.data.Store', {
        autoLoad: false,
        fields: ['id', 'size', 'percent', 'status', 'fileName']
    }),
    addFileBtnText: 'Add File',
    uploadBtnText: 'Upload',
    removeBtnText: 'Remove All',
    cancelBtnText: 'Cancel',
    //downloadTemplateText: 'Template',//下载模板
    debug: false,
    file_size_limit: "10240000000",//MB
    //file_size_limit: 0,//MB
    //file_size_limit: "2048",
    file_types: "*.bmp;*.jpg;*.png;*.jpeg",
    file_types_description: 'All Files',
    file_upload_limit: 1,
    file_queue_limit: 1,
    post_params: {},
    upload_url: '../api/ManagementSystem/uploadImage',
    flash_url: "../../../../../resources/swfupload/swfupload.swf",
    flash9_url: "../../../../../resources/swfuploadswfupload_fp9.swf",
    use_query_string: false,
    file_post_name: 'file',
    initComponent: function () {
        this.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'addFileBtn', iconCls: 'add', id: '_btn_for_swf_',
                        text: this.addFileBtnText
                    },
                    '-',
                    {
                        xtype: 'button',
                        itemId: 'uploadBtn', iconCls: 'upload', text: this.uploadBtnText, scope: this,
                        handler: this.onUpload
                    },
                    '-',
                    {
                        xtype: 'button',
                        itemId: 'removeBtn', iconCls: 'remove', text: this.removeBtnText, scope: this,
                        handler: this.onRemoveAll
                    }
                    //,
                    //'-',
                    //{
                    //    xtype: 'button',
                    //    itemId: 'downloadTemplateBtn',
                    //    iconCls: 'download',
                    //    text: this.downloadTemplateText,
                    //    scope: this,
                    //    handler: this.onDownloadTemplate
                    //}
                ]
            }
        ];
        this.callParent();
        this.down('button[itemId=addFileBtn]').on({
            afterrender: function (btn) {
                var config = this.getSWFConfig(btn);
                this.swfupload = new SWFUpload(config);
                Ext.get(this.swfupload.movieName).setStyle({
                    position: 'absolute',
                    top: 0,
                    left: -2
                });
            },
            scope: this,
            buffer: 300
        });
    },
    getSWFConfig: function (btn) {
        var me = this;
        var placeHolderId = Ext.id();
        var em = btn.getEl().child('em');
        if (em == null) {
            em = Ext.get(btn.getId() + '-btnWrap');
        }
        em.setStyle({
            position: 'relative',
            display: 'block'
        });
        em.createChild({
            tag: 'div',
            id: placeHolderId
        });
        return {
            debug: me.debug,
            flash_url: me.flash_url,
            flash9_url: me.flash9_url,
            upload_url: me.upload_url,
            post_params: me.post_params || {savePath: 'upload\\'},

            file_post_name: me.file_post_name,
            use_query_string: me.use_query_string,

            button_action: SWFUpload.BUTTON_ACTION.SELECT_FILE,//设置一次只能上传一个文件

            file_size_limit: (me.file_size_limit),
            file_types: me.file_types,
            file_types_description: me.file_types_description,
            file_upload_limit: me.file_upload_limit,
            file_queue_limit: me.file_queue_limit,
            button_width: em.getWidth(),
            button_height: em.getHeight(),
            button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
            button_cursor: SWFUpload.CURSOR.HAND,
            button_placeholder_id: placeHolderId,
            custom_settings: {
                scope_handler: me
            },
            swfupload_preload_handler: me.swfupload_preload_handler,
            file_queue_error_handler: me.file_queue_error_handler,
            swfupload_load_failed_handler: me.swfupload_load_failed_handler,
            upload_start_handler: me.upload_start_handler,
            upload_progress_handler: me.upload_progress_handler,
            upload_error_handler: me.upload_error_handler,
            upload_success_handler: me.upload_success_handler,
            upload_complete_handler: me.upload_complete_handler,
            file_queued_handler: me.file_queued_handler/*,
             file_dialog_complete_handler : me.file_dialog_complete_handler*/
        };
    },
    showBtn: function (me, bl) {
        me.down('#addFileBtn').setDisabled(!bl);
        me.down('#uploadBtn').setDisabled(!bl);
        me.down('#removeBtn').setDisabled(!bl);
        if (bl) {
            me.down('actioncolumn').show();
        } else {
            me.down('actioncolumn').hide();
        }
    },
    onUpload: function () {
        if (this.swfupload && this.store.getCount() > 0) {
            if (this.swfupload.getStats().files_queued > 0) {
                this.showBtn(this, false);
                this.swfupload.uploadStopped = false;
                this.swfupload.startUpload();
            }
        }
    },
    /**
     *  Remove all upload records
     */
    onRemoveAll: function () {
        var ds = this.store;
        for (var i = 0; i < ds.getCount(); i++) {
            var record = ds.getAt(i);
            var file_id = record.get('id');
            this.swfupload.cancelUpload(file_id, false);
            ds.remove(record);
        }
        this.swfupload.uploadStopped = false;

        //swfupload上传完成后删除文件 个数重置
        var stats = this.swfupload.getStats();
        stats.successful_uploads--;
        this.swfupload.setStats(stats);

    },
    /**
     * onCancelUpload
     */
    onCancelUpload: function () {
        if (this.swfupload) {
            this.swfupload.uploadStopped = true;
            this.swfupload.stopUpload();
            this.showBtn(this, true);
        }
    },
    /**
     *  下载模板
     */
    //onDownloadTemplate: function () {
    //    //debugger;
    //    var currentTime = new Date();
    //    var currentTime_1 = currentTime.getFullYear().toString();
    //    var currentTime_2 = (currentTime.getMonth() + 1).toString();
    //    var currentTime_3 = currentTime.getDate().toString();
    //    var currentTime_4 = currentTime.getHours().toString();
    //    var currentTime_5 = currentTime.getMinutes().toString();
    //    var currentTime_6 = currentTime.getSeconds().toString();
    //    var currentTime_ = currentTime_1 + currentTime_2 + currentTime_3 + currentTime_4 + currentTime_5 + currentTime_6;
    //    var filename = "Template" + "_" + currentTime_;
    //    Ext.getCmp('mainViewPort').getEl().mask("正在获取Excel下载链接，请稍候");//遮罩
    //    Ext.Ajax.request({
    //        url: '../api/CompanyInspectorSystem/GetDownloadTemplate',
    //        params: {
    //            filename: filename,
    //            RandomTag: Math.random()
    //        },
    //        method: 'Post',
    //        success: function (response) {
    //            //debugger;
    //            Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
    //            var rspText = Ext.JSON.decode(response.responseText);
    //            //console.log(rspText);
    //            if (rspText.success == true) {
    //                var data = rspText.data;
    //                Ext.MessageBox.alert("提示", "下载地址有效时间为30分钟<br/><a href='" + '../' + data + "'>点击下载</a>");
    //            } else {
    //                Ext.MessageBox.alert("抱歉", "下载链接获取错误，请刷新页面后重试");
    //            }
    //        },
    //        failure: function (response, options) {
    //            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
    //        }
    //    });
    //},
    swfupload_preload_handler: function () {
        var me = this.settings.custom_settings.scope_handler;
        me.store.removeAll();//点击选择 按钮 覆盖 原有 数据 保证 grid 里只有一条数据
        if (!this.support.loading) {
            Ext.Msg.show({
                title: '提示',
                msg: '浏览器Flash Player版本太低,不能使用该上传功能！',
                width: 250,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });
            return false;
        }
    },
    file_queue_error_handler: function (file, errorCode, message) {
        switch (errorCode) {
            case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED :
                msg('上传文件列表数量超限,不能选择！');
                break;
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT :
                msg('文件大小超过限制, 不能选择！');
                break;
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE :
                msg('该文件大小为0,不能选择！');
                break;
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE :
                msg('该文件类型不允许上传！');
                break;
        }
        function msg(info) {
            Ext.Msg.show({
                title: '提示', msg: info,
                width: 250,
                icon: Ext.Msg.WARNING,
                buttons: Ext.Msg.OK
            });
        }
    },
    swfupload_load_failed_handler: function () {
        Ext.Msg.show({
            title: '提示',
            msg: 'SWFUpload加载失败！',
            width: 180,
            icon: Ext.Msg.ERROR,
            buttons: Ext.Msg.OK
        });
    },
    upload_start_handler: function (file) {
        var me = this.settings.custom_settings.scope_handler;
        var rec = me.store.getById(file.id);
        if (!Ext.isEmpty(rec)) {
            var fileName = rec.get('fileName');
            this.setFilePostName(fileName);
            //this.setFilePostName(encodeURIComponent(rec.get('fileName')));
        }
    },
    upload_progress_handler: function (file, bytesLoaded, bytesTotal) {
        var me = this.settings.custom_settings.scope_handler;
        var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
        percent = percent == 100 ? 99 : percent;
        var rec = me.store.getById(file.id);
        rec.set('percent', percent);
        rec.set('status', file.filestatus);
        rec.commit();
    },
    upload_error_handler: function (file, errorCode, message) {
        //debugger;
        var me = this.settings.custom_settings.scope_handler;
        var rec = me.store.getById(file.id);
        rec.set('percent', 0);
        rec.set('status', file.filestatus);
        rec.commit();
    },
    upload_success_handler: function (file, serverData, responseReceived) {
        //debugger;
        var me = this.settings.custom_settings.scope_handler;

        //swfupload上传完成后删除文件 个数重置
        var stats = this.getStats();
        stats.successful_uploads--;
        this.setStats(stats);

        var rec = me.store.getById(file.id);
        if (Ext.JSON.decode(serverData).success) {

            //debugger;

            var filePath = "";
            filePath = JSON.parse(serverData).data;

            var Arr = filePath.split("\\");

            var imageurl = "";
            imageurl = Arr[Arr.length - 1];

            //Ext.getCmp('zhuTiWindow').down('#imageurl').setValue(imageurl);
            var titleindex=Ext.getCmp('uploadWindow').title.substring(3,4);
            if(titleindex==1){
                Ext.getElementById('MenuDetail_DishUrl').src = "../../../menuimage/" + imageurl;
                PublicObject.imageurl = imageurl;
            }
            document.getElementById("img_"+titleindex).src= "../../../menuimage/" + imageurl;
            rec.set('percent', 100);
            rec.set('status', file.filestatus);
            Ext.getCmp("uploadWindow").destroy();
        } else {
            rec.set('percent', 0);
            rec.set('status', SWFUpload.FILE_STATUS.ERROR);
        }
        rec.commit();
        if (this.getStats().files_queued > 0 && this.uploadStopped == false) {
            this.startUpload();
        } else {
            me.showBtn(me, true);
        }
    },
    upload_complete_handler: function (file) {
        //debugger;
    },
    file_queued_handler: function (file) {
        var me = this.settings.custom_settings.scope_handler;

        me.store.removeAll();//点击选择 按钮 覆盖 原有 数据 保证 grid 里只有一条数据
        //swfupload上传完成后删除文件 个数重置
        var stats = this.getStats();
        stats.successful_uploads--;
        this.setStats(stats);

        me.store.add({
            id: file.id,
            fileName: file.name,
            size: file.size,
            type: file.type,
            status: file.filestatus,
            percent: 0
        });
        me.store.commitChanges();
    }
});
