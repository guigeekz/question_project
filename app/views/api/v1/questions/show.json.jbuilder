json.id @question.id
json.subject @question.subject
json.created_at @question.created_at.strftime("%H:%M | %d/%m/%Y")
json.user @question.user.email
json.nb_view @question.views
json.is_own (current_user == @question.user) ? true : false
