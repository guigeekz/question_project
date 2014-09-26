json.id @question.id
json.subject @question.subject
json.created_at @question.created_at.strftime("à %H:%M le %d/%m/%Y")
json.updated_at @question.updated_at.strftime("%H:%M | %d/%m/%Y")
json.user @question.user.email
json.is_own (current_user == @question.user) ? true : false
