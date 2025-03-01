export type OrganizationUser = {
    organization_id: string;
    user_id: string;
    role?: "admin" | "contractor" | "client";
    permissions: ("AllUserAllMethods " |  "AllUserSelectMethod " |  "AllUserInsertMethod " |  "AllUserUpdateMethod " |  "AllUserDeleteMethod " |
             "AllOrgAllMethods " |  "AllOrgSelectMethod " |  "AllOrgInsertMethod " |  "AllOrgUpdateMethod " |  "AllOrgDeleteMethod " |
             "OrgUsersOnlyAllMethods " |  "OrgUsersOnlySelectMethod " |  "OrgUsersOnlyInsertMethod " |  "OrgUsersOnlyUpdateMethod " |  "OrgUsersOnlyDeleteMethod " |
             "AllProjectAllMethods " |  "AllProjectSelectMethod " |  "AllProjectInsertMethod " |  "AllProjectUpdateMethod " |  "AllProjectDeleteMethod " |
             "ProjectUsersOnlyAllMethods " |  "ProjectUsersOnlySelectMethod " |  "ProjectUsersOnlyInsertMethod " |  "ProjectUsersOnlyUpdateMethod " |  "ProjectUsersOnlyDeleteMethod ")[];
};
