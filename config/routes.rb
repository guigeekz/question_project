QuestionProject::Application.routes.draw do
  resources :questions


  devise_for :users

  root :to => 'questions#index'
  
end
