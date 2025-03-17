import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, LayoutGrid, BarChart3, ListFilter } from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <motion.div 
    className="flex flex-col items-center space-y-4 glass-panel rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
      <Icon className="h-7 w-7 text-primary" />
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-muted-foreground text-center">
      {description}
    </p>
  </motion.div>
);

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div 
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold"
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              iT
            </motion.div>
            <span className="font-medium text-lg hidden sm:inline-block">iTask</span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link to="/auth">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 -z-10"></div>
          
          {/* Animated circles in background */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div 
              className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full bg-primary/5"
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, -20, 0]
              }}
              transition={{ duration: 15, repeat: Infinity }}
            />
            <motion.div 
              className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-accent/5"
              animate={{ 
                scale: [1, 1.1, 1],
                x: [0, -20, 0],
                y: [0, 40, 0]
              }}
              transition={{ duration: 20, repeat: Infinity }}
            />
          </div>
          
          <div className="container px-4 md:px-6">
            <motion.div 
              className="flex flex-col items-center space-y-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="space-y-4">
                <motion.h1 
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  Prioritize Your Tasks <br/>
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">With Precision</span>
                </motion.h1>
                <motion.p 
                  className="mx-auto max-w-[700px] text-muted-foreground text-xl md:text-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  Set your tasks on a scale of preference and accomplish what matters most.
                </motion.p>
              </div>
              <motion.div 
                className="space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md">
                  <Link to="/auth">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              
              {/* Task Visualization Mockup */}
              <motion.div 
                className="w-full max-w-4xl mt-12 glass-panel rounded-xl p-6 shadow-2xl overflow-hidden bg-white/80 dark:bg-black/40"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.7 }}
              >
                <div className="flex flex-col space-y-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold">Priority Dashboard</h3>
                    <div className="flex space-x-2">
                      <div className="h-3 w-3 rounded-full bg-red-400"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                      <div className="h-3 w-3 rounded-full bg-green-400"></div>
                    </div>
                  </div>
                  
                  {/* Task Items */}
                  {[
                    { name: "Quarterly report", priority: 9, color: "bg-red-500" },
                    { name: "Team meeting prep", priority: 7, color: "bg-orange-500" },
                    { name: "Client proposal", priority: 6, color: "bg-yellow-500" },
                    { name: "Update documentation", priority: 4, color: "bg-green-500" },
                    { name: "Weekly check-in", priority: 3, color: "bg-blue-500" }
                  ].map((task, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 shadow-sm"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index + 0.8 }}
                    >
                      <div className={`h-5 w-5 rounded-full ${task.color} mr-3`}></div>
                      <span className="flex-grow font-medium">{task.name}</span>
                      <div className="flex items-center">
                        <span className="text-sm font-semibold mr-2">Priority: {task.priority}</span>
                        <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div 
                            className={`h-full rounded-full ${task.color}`} 
                            style={{ width: `${task.priority * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-2">
                <motion.div 
                  className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Features
                </motion.div>
                <motion.h2 
                  className="text-3xl font-bold tracking-tighter md:text-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  A better way to prioritize
                </motion.h2>
                <motion.p 
                  className="max-w-[700px] text-muted-foreground md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Our intuitive interface helps you focus on what's most important.
                </motion.p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
              <FeatureCard 
                icon={BarChart3}
                title="Priority Scaling"
                description="Assign priority levels to tasks from 1-10 to clearly define importance and focus."
              />
              
              <FeatureCard 
                icon={LayoutGrid}
                title="Visual Organization"
                description="See your tasks organized visually based on priority and status with intuitive color coding."
              />
              
              <FeatureCard 
                icon={ListFilter}
                title="Smart Filtering"
                description="Quickly filter and sort tasks by priority, deadline, or custom categories."
              />
            </div>
          </div>
        </section>

        {/* How It Works section */}
        <section className="w-full py-16 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground mb-2"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                How It Works
              </motion.div>
              <motion.h2 
                className="text-3xl font-bold tracking-tighter md:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Simple Steps to Better Productivity
              </motion.h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {[
                {
                  step: "1",
                  title: "Create Tasks",
                  description: "Add your tasks and set deadlines in our intuitive interface."
                },
                {
                  step: "2",
                  title: "Set Priorities",
                  description: "Assign each task a priority value from 1-10 on our scale."
                },
                {
                  step: "3",
                  title: "Focus & Execute",
                  description: "Work on high-priority tasks first and track your progress."
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 * index }}
                >
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="flex flex-col items-center justify-center space-y-8 text-center max-w-3xl mx-auto glass-panel p-8 rounded-2xl shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to start organizing?</h2>
                <p className="text-muted-foreground text-lg md:text-xl">
                  Join thousands of users who have improved their productivity with PriorityScale.
                </p>
              </div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button asChild size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md text-lg">
                  <Link to="/auth">Create your account</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 md:py-10">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">iT</div>
            <span className="text-sm font-medium">iTask</span>
            <p className="text-center text-sm text-muted-foreground">
               © {new Date().getFullYear()}  iTask. All rights reserved.
            </p>
          </div>
          
        </div>
      </footer>
    </div>
  );
};

export default Index;