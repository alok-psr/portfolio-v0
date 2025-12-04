"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@/components/ImageUpload";
import { saveProfile, saveProjects, createBlogPost, verifyAdmin, fetchProfile, fetchProjects } from "@/app/actions";
import { Project, ProfileData } from "@/lib/db";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Data State
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Blog State
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await verifyAdmin(passcode);
    if (result.success) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
    } else {
      toast.error("Access Denied: Invalid passcode.");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_authenticated");
    if (isAuth === "true") {
        setIsAuthenticated(true);
    }
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
        const loadData = async () => {
            try {
                const [profileData, projectsData] = await Promise.all([
                    fetchProfile(),
                    fetchProjects()
                ]);
                setProfile(profileData);
                setProjects(projectsData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                toast.error("Failed to load data.");
            }
        };
        loadData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Restricted Access</CardTitle>
            <CardDescription>Enter admin passcode to continue.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input 
                type="password" 
                placeholder="Passcode" 
                value={passcode} 
                onChange={(e) => setPasscode(e.target.value)} 
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Unlock
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" onClick={() => {
            setIsAuthenticated(false);
            sessionStorage.removeItem("admin_authenticated");
        }} className="rounded-none frame-corners-alt hover:bg-destructive/10 hover:text-destructive transition-colors">Logout</Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="rounded-none border border-border bg-background p-0">
          <TabsTrigger value="profile" className="rounded-none data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Profile</TabsTrigger>
          <TabsTrigger value="projects" className="rounded-none data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Projects</TabsTrigger>
          <TabsTrigger value="blog" className="rounded-none data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Write Blog</TabsTrigger>
        </TabsList>

        {/* PROFILE TAB */}
        <TabsContent value="profile">
          <Card className="rounded-none frame-corners border-border/50">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Update your personal information and landing page content.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Profile Image</Label>
                <ImageUpload 
                    value={profile?.image || ""} 
                    onChange={(url) => setProfile(prev => prev ? ({ ...prev, image: url }) : null)} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input 
                    value={profile?.name || ""} 
                    onChange={(e) => setProfile(prev => prev ? ({ ...prev, name: e.target.value }) : null)} 
                    className="rounded-none frame-corners"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input 
                    value={profile?.title || ""} 
                    onChange={(e) => setProfile(prev => prev ? ({ ...prev, title: e.target.value }) : null)} 
                    className="rounded-none frame-corners"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Bio</Label>
                <Textarea 
                    value={profile?.bio || ""} 
                    onChange={(e) => setProfile(prev => prev ? ({ ...prev, bio: e.target.value }) : null)} 
                    className="rounded-none frame-corners"
                />
              </div>

              <Button onClick={() => profile && saveProfile(profile)} disabled={!profile} className="rounded-none frame-corners">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* PROJECTS TAB */}
        <TabsContent value="projects">
          <Card className="rounded-none frame-corners border-border/50">
            <CardHeader>
              <CardTitle>Manage Projects</CardTitle>
              <CardDescription>Add or edit your portfolio projects.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* List of projects would go here with Edit/Delete buttons */}
                {/* For MVP, just a JSON editor or simple list */}
                <div className="space-y-4">
                    {projects.map((project, index) => (
                        <div key={project.id} className="flex items-center gap-4 p-4 border border-border/50 rounded-none hover:bg-muted/30 transition-colors">
                            <div className="flex-1">
                                <h3 className="font-bold">{project.title}</h3>
                                <p className="text-sm text-muted-foreground truncate">{project.description}</p>
                            </div>
                            <Button variant="destructive" size="icon" className="rounded-none">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" className="w-full rounded-none frame-corners">
                        <Plus className="w-4 h-4 mr-2" /> Add Project
                    </Button>
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BLOG TAB */}
        <TabsContent value="blog">
          <Card className="rounded-none frame-corners border-border/50">
            <CardHeader>
              <CardTitle>Write New Blog Post</CardTitle>
              <CardDescription>Create a new markdown blog post.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input 
                    value={blogTitle} 
                    onChange={(e) => setBlogTitle(e.target.value)} 
                    placeholder="My Awesome Post"
                    className="rounded-none frame-corners"
                />
              </div>
              <div className="space-y-2">
                <Label>Content (Markdown)</Label>
                <Textarea 
                    value={blogContent} 
                    onChange={(e) => setBlogContent(e.target.value)} 
                    className="min-h-[300px] font-mono rounded-none frame-corners"
                    placeholder="# Hello World..."
                />
              </div>
              <Button onClick={() => createBlogPost(blogTitle, blogContent)} className="rounded-none frame-corners">
                <Save className="w-4 h-4 mr-2" /> Publish Post
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
