-- TABLES
CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text UNIQUE NOT NULL,
    firstname text NOT NULL,
    lastname text NOT NULL,
    bio text,
    created_at timestamp DEFAULT now(),
    role text CHECK (role IN ('admin', 'contractor', 'client')) NOT NULL,
    permissions text[] DEFAULT '{}'::text[] CHECK (
        permissions <@ ARRAY[
            'AllUserAllMethods', 'AllUserSelectMethod', 'AllUserInsertMethod', 'AllUserUpdateMethod', 'AllUserDeleteMethod',
            'AllOrgAllMethods', 'AllOrgSelectMethod', 'AllOrgInsertMethod', 'AllOrgUpdateMethod', 'AllOrgDeleteMethod',
            'OrgUsersOnlyAllMethods', 'OrgUsersOnlySelectMethod', 'OrgUsersOnlyInsertMethod', 'OrgUsersOnlyUpdateMethod', 'OrgUsersOnlyDeleteMethod',
            'AllProjectAllMethods', 'AllProjectSelectMethod', 'AllProjectInsertMethod', 'AllProjectUpdateMethod', 'AllProjectDeleteMethod',
            'ProjectUsersOnlyAllMethods', 'ProjectUsersOnlySelectMethod', 'ProjectUsersOnlyInsertMethod', 'ProjectUsersOnlyUpdateMethod', 'ProjectUsersOnlyDeleteMethod'
        ]
    )
);


create table organizations (
    id uuid primary key default gen_random_uuid(),
    logo_url text,
    name text not null unique,
    website text
);

create table projects (
    id uuid primary key default gen_random_uuid(),
    primary_organization uuid references organizations(id) on delete cascade,
    description text
);

create table organization_users (
    organization_id uuid references organizations(id) on delete cascade,
    user_id uuid references users(id) on delete cascade,
    role text not null,
    permissions text[] DEFAULT '{}'::text[] CHECK (
        permissions <@ ARRAY[
            'AllUserAllMethods', 'AllUserSelectMethod', 'AllUserInsertMethod', 'AllUserUpdateMethod', 'AllUserDeleteMethod',
            'AllOrgAllMethods', 'AllOrgSelectMethod', 'AllOrgInsertMethod', 'AllOrgUpdateMethod', 'AllOrgDeleteMethod',
            'OrgUsersOnlyAllMethods', 'OrgUsersOnlySelectMethod', 'OrgUsersOnlyInsertMethod', 'OrgUsersOnlyUpdateMethod', 'OrgUsersOnlyDeleteMethod',
            'AllProjectAllMethods', 'AllProjectSelectMethod', 'AllProjectInsertMethod', 'AllProjectUpdateMethod', 'AllProjectDeleteMethod',
            'ProjectUsersOnlyAllMethods', 'ProjectUsersOnlySelectMethod', 'ProjectUsersOnlyInsertMethod', 'ProjectUsersOnlyUpdateMethod', 'ProjectUsersOnlyDeleteMethod'
        ]
    ),
    primary key (organization_id, user_id)
);

create table project_users (
    project_id uuid references projects(id) on delete cascade,
    user_id uuid references users(id) on delete cascade,
    role text not null,
    permissions text[] DEFAULT '{}'::text[] CHECK (
        permissions <@ ARRAY[
            'AllUserAllMethods', 'AllUserSelectMethod', 'AllUserInsertMethod', 'AllUserUpdateMethod', 'AllUserDeleteMethod',
            'AllOrgAllMethods', 'AllOrgSelectMethod', 'AllOrgInsertMethod', 'AllOrgUpdateMethod', 'AllOrgDeleteMethod',
            'OrgUsersOnlyAllMethods', 'OrgUsersOnlySelectMethod', 'OrgUsersOnlyInsertMethod', 'OrgUsersOnlyUpdateMethod', 'OrgUsersOnlyDeleteMethod',
            'AllProjectAllMethods', 'AllProjectSelectMethod', 'AllProjectInsertMethod', 'AllProjectUpdateMethod', 'AllProjectDeleteMethod',
            'ProjectUsersOnlyAllMethods', 'ProjectUsersOnlySelectMethod', 'ProjectUsersOnlyInsertMethod', 'ProjectUsersOnlyUpdateMethod', 'ProjectUsersOnlyDeleteMethod'
        ]
    ),
    primary key (project_id, user_id)
);


-- RLS
-- Enable RLS on the users table (for row-level security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Enable RLS on the organizations and projects tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Enable RLS on the organization_users and project_users tables
ALTER TABLE organization_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_users ENABLE ROW LEVEL SECURITY;

-- DROP POLICIES
DROP POLICY IF EXISTS "user_select_users" ON users;
DROP POLICY IF EXISTS "user_insert_users" ON users;
DROP POLICY IF EXISTS "user_update_users" ON users;
DROP POLICY IF EXISTS "user_delete_users" ON users;
DROP POLICY IF EXISTS "user_select_organizations" ON organizations;
DROP POLICY IF EXISTS "user_insert_organizations" ON organizations;
DROP POLICY IF EXISTS "user_update_organizations" ON organizations;
DROP POLICY IF EXISTS "user_delete_organizations" ON organizations;
DROP POLICY IF EXISTS "user_select_projects" ON projects;
DROP POLICY IF EXISTS "user_insert_projects" ON projects;
DROP POLICY IF EXISTS "user_update_projects" ON projects;
DROP POLICY IF EXISTS "user_delete_projects" ON projects;
DROP POLICY IF EXISTS "user_select_organization_users" ON organization_users;
DROP POLICY IF EXISTS "user_insert_organization_users" ON organization_users;
DROP POLICY IF EXISTS "user_update_organization_users" ON organization_users;
DROP POLICY IF EXISTS "user_delete_organization_users" ON organization_users;
DROP POLICY IF EXISTS "user_select_project_users" ON project_users;
DROP POLICY IF EXISTS "user_insert_project_users" ON project_users;
DROP POLICY IF EXISTS "user_update_project_users" ON project_users;
DROP POLICY IF EXISTS "user_delete_project_users" ON project_users;

-- DROP VIEW
DROP VIEW user_permissions_view;

-- VIEWS
CREATE VIEW user_permissions_view AS
SELECT id, role, permissions
FROM users;

-- USER PERMISSIONS
-- SELECT
CREATE POLICY user_select_users ON users
FOR SELECT
USING (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin')) -- admins always have full access
    OR 
    'AllUsersAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllUsersSelectMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    (id = auth.uid())
);

-- INSERT
CREATE POLICY user_insert_users ON users
FOR INSERT
WITH CHECK (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllUsersAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllUsersInsertMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    (id = auth.uid())

);

-- UPDATE
CREATE POLICY user_update_users ON users
FOR UPDATE
USING (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllUsersAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllUsersUpdateMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    (id = auth.uid())
);

-- DELETE
CREATE POLICY user_delete_users ON users
FOR SELECT
USING (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllUsersAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllUsersDeleteMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    (id = auth.uid())
);

-- PROJECT PERMISSIONS
-- SELECT
CREATE POLICY user_select_projects ON projects
FOR SELECT
USING (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllProjectAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllProjectSelectMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR 
    'AllProjectAllMethods' = ANY (
        SELECT unnest(permissions)
        FROM project_users
        JOIN projects ON project_users.project_id = projects.id
        WHERE project_users.user_id = auth.uid() AND project_users.project_id = projects.id
    )
    OR
    'AllProjectSelectMethod' = ANY (
        SELECT unnest(permissions)
        FROM project_users
        JOIN projects ON project_users.project_id = projects.id
        WHERE project_users.user_id = auth.uid() AND project_users.project_id = projects.id
    )
    OR EXISTS (
        SELECT 1
        FROM project_users
        JOIN projects ON project_users.project_id = projects.id
        WHERE project_users.user_id = auth.uid() AND project_users.project_id = projects.id
    )
);

-- INSERT
CREATE POLICY user_insert_projects ON projects
FOR INSERT
WITH CHECK (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllProjectAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllProjectInsertMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR 
    'AllProjectAllMethods' = ANY (
        SELECT unnest(permissions)
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
    OR
    'AllProjectInsertMethod' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
);

-- UPDATE
CREATE POLICY user_update_projects ON projects
FOR UPDATE
USING (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllProjectAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllProjectUpdateMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR 
    'AllProjectAllMethods' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
    OR
    'AllProjectUpdateMethod' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
);

-- DELETE
CREATE POLICY user_delete_projects ON projects
FOR SELECT
USING (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllProjectAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllProjectDeleteMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR 
    'AllProjectAllMethods' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
    OR
    'AllProjectDeleteMethod' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
);

-- ORGANIZATIONS PERMISSIONS
-- SELECT
CREATE POLICY user_select_organizations ON organizations
FOR SELECT
USING (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllOrgAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllOrgSelectMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR 
    'AllOrgAllMethods' = ANY (SELECT unnest(permissions) FROM organization_users WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id))
    OR
    'AllOrgSelectMethod' = ANY (SELECT unnest(permissions) FROM organization_users WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id))
    OR
    EXISTS (
        SELECT 1
        FROM organization_users
        WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id)
    )
    
);

-- INSERT
CREATE POLICY user_insert_organizations ON organizations
FOR INSERT
WITH CHECK (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllOrgAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllOrgInsertMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR 
    'AllOrgAllMethods' = ANY (SELECT unnest(permissions) FROM organization_users WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id))
    OR
    'AllOrgInsertMethod' = ANY (SELECT unnest(permissions) FROM organization_users WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id))
);

-- UPDATE
CREATE POLICY user_update_organizations ON organizations
FOR UPDATE
USING (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllOrgAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllOrgUpdateMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR 
    'AllOrgAllMethods' = ANY (SELECT unnest(permissions) FROM organization_users WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id))
    OR
    'AllOrgUpdateMethod' = ANY (SELECT unnest(permissions) FROM organization_users WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id))
);

-- DELETE
CREATE POLICY user_delete_organizations ON organizations
FOR SELECT
USING (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllOrgAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllOrgDeleteMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR 
    'AllOrgAllMethods' = ANY (SELECT unnest(permissions) FROM organization_users WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id))
    OR
    'AllOrgDeleteMethod' = ANY (SELECT unnest(permissions) FROM organization_users WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id))
);

-- ALL PROJECT USER PERMISSIONS
-- SELECT
CREATE POLICY user_select_project_users ON project_users
FOR SELECT
USING (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllProjectAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllProjectSelectMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR 
    'AllProjectAllMethods' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
    OR
    'AllProjectSelectMethod' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
    OR
    'ProjectUsersOnlyAllMethods' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
    OR
    'ProjectUsersOnlySelectMethod' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
);

-- INSERT
CREATE POLICY user_insert_project_users ON project_users
FOR INSERT
WITH CHECK (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllProjectAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllProjectInsertMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR 
    'AllProjectAllMethods' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
    OR
    'AllProjectInsertMethod' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
    OR
    'ProjectUsersOnlyAllMethods' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
    OR
    'ProjectUsersOnlyInsertMethod' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
);

-- UPDATE
CREATE POLICY user_update_project_users ON project_users
FOR UPDATE
USING (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllProjectAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllProjectUpdateMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR 
    'AllProjectAllMethods' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
    OR
    'AllProjectUpdateMethod' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
    OR
    'ProjectUsersOnlyAllMethods' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
    OR
    'ProjectUsersOnlyUpdateMethod' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
);

-- DELETE
CREATE POLICY user_delete_project_users ON project_users
FOR DELETE
USING (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllProjectAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllProjectDeleteMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR 
    'AllProjectAllMethods' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
    OR
    'AllProjectDeleteMethod' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
    OR
    'ProjectUsersOnlyAllMethods' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
    OR
    'ProjectUsersOnlyDeleteMethod' = ANY (
        SELECT unnest(permissions) 
        FROM project_users 
        JOIN projects ON project_users.project_id = projects.id
        WHERE (project_users.user_id = auth.uid() AND project_users.project_id = projects.id)
    )
);

-- ALL ORGANIZATION USER PERMISSIONS
-- SELECT
CREATE POLICY user_select_organization_users ON organization_users
FOR SELECT
USING (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllOrgAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllOrgSelectMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR 
    'AllOrgAllMethods' = ANY (
        SELECT unnest(permissions) 
        FROM organization_users 
        JOIN organizations ON organization_users.organization_id = organizations.id
        WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id)
    )
    OR
    'AllOrgSelectMethod' = ANY (
        SELECT unnest(permissions) 
        FROM organization_users 
        JOIN organizations ON organization_users.organization_id = organizations.id
        WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id)
    )
    OR
    'OrgUsersOnlyAllMethods' = ANY (
        SELECT unnest(permissions) 
        FROM organization_users 
        JOIN organizations ON organization_users.organization_id = organizations.id
        WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id)
    )
    OR
    'OrgUsersOnlySelectMethod' = ANY (
        SELECT unnest(permissions) 
        FROM organization_users 
        JOIN organizations ON organization_users.organization_id = organizations.id
        WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id)
    )
);

-- INSERT
CREATE POLICY user_insert_organization_users ON organization_users
FOR INSERT
WITH CHECK (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllOrgAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllOrgInsertMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR 
    'AllOrgAllMethods' = ANY (
        SELECT unnest(permissions) 
        FROM organization_users 
        JOIN organizations ON organization_users.organization_id = organizations.id
        WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id)
    )
    OR
    'AllOrgInsertMethod' = ANY (
        SELECT unnest(permissions) 
        FROM organization_users 
        JOIN organizations ON organization_users.organization_id = organizations.id
        WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id)
    )
    OR
    'OrgUsersOnlyAllMethods' = ANY (
        SELECT unnest(permissions) 
        FROM organization_users 
        JOIN organizations ON organization_users.organization_id = organizations.id
        WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id)
    )
    OR
    'OrgUsersOnlyInsertMethod' = ANY (
        SELECT unnest(permissions) 
        FROM organization_users 
        JOIN organizations ON organization_users.organization_id = organizations.id
        WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id)
    )
);

-- UPDATE
CREATE POLICY user_update_organization_users ON organization_users
FOR UPDATE
USING (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllOrgAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllOrgUpdateMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR 
    'AllOrgAllMethods' = ANY (
        SELECT unnest(permissions) 
        FROM organization_users 
        JOIN organizations ON organization_users.organization_id = organizations.id
        WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id)
    )
    OR
    'AllOrgUpdateMethod' = ANY (
        SELECT unnest(permissions) 
        FROM organization_users 
        JOIN organizations ON organization_users.organization_id = organizations.id
        WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id)
    )
    OR
    'OrgUsersOnlyAllMethods' = ANY (
        SELECT unnest(permissions) 
        FROM organization_users 
        JOIN organizations ON organization_users.organization_id = organizations.id
        WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id)
    )
    OR
    'OrgUsersOnlyUpdateMethod' = ANY (
        SELECT unnest(permissions) 
        FROM organization_users 
        JOIN organizations ON organization_users.organization_id = organizations.id
        WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id)
    )
);

-- DELETE
CREATE POLICY user_delete_organization_users ON organization_users
FOR DELETE
USING (
    (EXISTS (SELECT 1 FROM user_permissions_view WHERE id = auth.uid() AND role = 'admin'))
    OR 
    'AllOrgAllMethods' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR
    'AllOrgDeleteMethod' = ANY (SELECT unnest(permissions) FROM user_permissions_view WHERE id = auth.uid())
    OR 
    'AllOrgAllMethods' = ANY (
        SELECT unnest(permissions) 
        FROM organization_users 
        JOIN organizations ON organization_users.organization_id = organizations.id
        WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id)
    )
    OR
    'AllOrgDeleteMethod' = ANY (
        SELECT unnest(permissions) 
        FROM organization_users 
        JOIN organizations ON organization_users.organization_id = organizations.id
        WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id)
    )
    OR
    'OrgUsersOnlyAllMethods' = ANY (
        SELECT unnest(permissions) 
        FROM organization_users 
        JOIN organizations ON organization_users.organization_id = organizations.id
        WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id)
    )
    OR
    'OrgUsersOnlyDeleteMethod' = ANY (
        SELECT unnest(permissions) 
        FROM organization_users 
        JOIN organizations ON organization_users.organization_id = organizations.id
        WHERE (organization_users.user_id = auth.uid() AND organization_users.organization_id = organizations.id)
    )
);
