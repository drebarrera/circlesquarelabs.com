'use server';

import { createClient } from '@/utils/supabase/server';
import { User } from '@/types/user';
import { PostgrestError } from '@supabase/supabase-js';

export async function getAuthUser() {
    const supabase = await createClient()

    const { data: {user}, error } = await supabase.auth.getUser();

    if (error) {
        console.log(error);
        return {
            success: false,
            user: null,
            error: error
        }
    }

    return {
        success: true,
        user: user,
        error: null
    }
}

export async function getUser(id: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('users') // Table name is 'users'
        .select('*')
        .eq('id', id) // Match user by id
        .single()
        .overrideTypes<User | PostgrestError>();

    console.log(data);
    if (error) {
        console.log(error);
        return {
            success: false,
            user: null,
            error: error
        }
    }

    return {
        success: true,
        user: data,
        error: null
    }
}