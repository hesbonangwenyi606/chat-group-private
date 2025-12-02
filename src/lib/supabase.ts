import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://ibofpqzzfpvvmgbnbucb.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImRjYzRiNTFlLTU4M2QtNDFhMy04MTBiLTcyYTg1Y2U3OThiYiJ9.eyJwcm9qZWN0SWQiOiJpYm9mcHF6emZwdnZtZ2JuYnVjYiIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY0NjU1OTU5LCJleHAiOjIwODAwMTU5NTksImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.IcsuFMCNJDP7pVSGp3imgJgDoovjfpj2AnK_kjE_GaE';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };