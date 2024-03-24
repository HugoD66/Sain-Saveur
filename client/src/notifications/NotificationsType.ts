export interface BaseNotification {
  type: "user" | "recipe" | "user-welcome";
  title: string;
  date: string;
  seen: boolean;
}

export interface UserNotification extends BaseNotification {
  type: "user";
  content: { pseudo: string; email: string };
}

export interface RecipeNotification extends BaseNotification {
  type: "recipe";
  content: { recipeId: string; recipeName: string };
}

export interface WelcomeUserNotification extends BaseNotification {
  type: "user-welcome";
  content: "Bienvenu sur l'application Sain-Saveur !";
}

export type Notification =
  | UserNotification
  | RecipeNotification
  | WelcomeUserNotification;
