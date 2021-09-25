Ext.define('Admin.view.profile.UserProfile', {
    extend: 'Admin.view.profile.UserProfileBase',
    xtype: 'profile',

    cls: 'userProfile-container dashboard',
    scrollable: 'y',

    defaults: {
        shadow: true,
        userCls: 'big-50 small-100 dashboard-item'
    },

    items: [{
        xtype: 'profilesocial'
    }, {
        xtype: 'profiledescription'
    }]
});
