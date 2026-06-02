
const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
    redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback?next=/reset-password`,
});