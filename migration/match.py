m1 = ['AllUsers', 'AllOrg', 'OrgUsersOnly', 'AllProject', 'ProjectUsersOnly']
m2 = ['AllMethods', 'SelectMethod', 'InsertMethod', 'UpdateMethod', 'DeleteMethod']

print(', '.join([', '.join([f"'{x + y}'" for y in m2]) for x in m1]))