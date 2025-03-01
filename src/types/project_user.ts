export type ProjectUser = {
    project_id: string;
    user_id: string;
    role?: string;
    permissions: ("AllUserAllMethods " |  "AllUserSelectMethod " |  "AllUserInsertMethod " |  "AllUserUpdateMethod " |  "AllUserDeleteMethod " |
             "AllOrgAllMethods " |  "AllOrgSelectMethod " |  "AllOrgInsertMethod " |  "AllOrgUpdateMethod " |  "AllOrgDeleteMethod " |
             "OrgUsersOnlyAllMethods " |  "OrgUsersOnlySelectMethod " |  "OrgUsersOnlyInsertMethod " |  "OrgUsersOnlyUpdateMethod " |  "OrgUsersOnlyDeleteMethod " |
             "AllProjectAllMethods " |  "AllProjectSelectMethod " |  "AllProjectInsertMethod " |  "AllProjectUpdateMethod " |  "AllProjectDeleteMethod " |
             "ProjectUsersOnlyAllMethods " |  "ProjectUsersOnlySelectMethod " |  "ProjectUsersOnlyInsertMethod " |  "ProjectUsersOnlyUpdateMethod " |  "ProjectUsersOnlyDeleteMethod ")[];
};
