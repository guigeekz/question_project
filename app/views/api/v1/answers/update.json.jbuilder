json.id @answer.id
json.content @answer.content
json.created_at @answer.created_at.strftime("à %H:%M le %d/%m/%Y")
json.updated_at @answer.updated_at.strftime("modifié à %H:%M le %d/%m/%Y")
json.question_id @answer.question.id
json.user @answer.user.email
json.is_own (current_user == @answer.user) ? true : false